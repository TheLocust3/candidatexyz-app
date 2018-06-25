provider "aws" {
  region = "us-east-1"
}

variable "name" {
  default = "candidatexyzapp"
}

variable "username" {
  default = "candidatexyz"
}

variable "key" {
  default = "candidatexyz"
}

data "aws_ami" "image" {
  name_regex = "candidatexyz-barebones"

  # name_regex  = "candidatexyz-app"
  most_recent = true
}

data "aws_availability_zone" "zone" {
  name = "us-east-1a"
}

data "aws_subnet" "east1" {
  availability_zone = "us-east-1a"
}

data "aws_subnet" "east2" {
  availability_zone = "us-east-1b"
}

data "aws_vpc" "default" {
  default = true
}

data "aws_acm_certificate" "certificate" {
  domain = "demo.candidatexyz.com"
}

resource "random_id" "database_password" {
  keepers = {
    password = "${var.username}"
  }

  byte_length = 16
}

resource "random_id" "random" {
  keepers = {
    password = "${var.name}" // Using this for snapshot names
  }

  byte_length = 8
}

resource "aws_security_group" "security_group" {
  name        = "${var.name} security group"
  description = "Managed by Terraform"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "db_security_group" {
  name        = "${var.name} rds security group"
  description = "Managed by Terraform"

  ingress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    security_groups = ["${aws_security_group.security_group.id}"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

data "aws_iam_policy_document" "ec2-role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "ec2-role" {
  name               = "${var.name}-ec2"
  assume_role_policy = "${data.aws_iam_policy_document.ec2-role.json}"
}

resource "aws_iam_role_policy_attachment" "ec2-role-for-codedeploy" {
  role       = "${aws_iam_role.ec2-role.name}"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2RoleforAWSCodeDeploy"
}

resource "aws_iam_instance_profile" "ec2-profile" {
  name = "${var.name}_profile"
  role = "${aws_iam_role.ec2-role.name}"
}

data "aws_iam_policy_document" "codedeploy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["codedeploy.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "deployment" {
  name = "${var.name}-deployment"

  assume_role_policy = "${data.aws_iam_policy_document.codedeploy.json}"
}

resource "aws_iam_role_policy_attachment" "deployment" {
  role       = "${aws_iam_role.deployment.name}"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSCodeDeployRole"
}

resource "aws_launch_configuration" "launch" {
  name                 = "${var.name}-config"
  image_id             = "${data.aws_ami.image.id}"
  instance_type        = "t2.micro"
  security_groups      = ["${aws_security_group.security_group.id}"]
  iam_instance_profile = "${aws_iam_instance_profile.ec2-profile.name}"
  key_name             = "${var.key}"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_lb" "load_balancer" {
  name               = "${var.name}-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = ["${aws_security_group.security_group.id}"]
  subnets            = ["${data.aws_subnet.east1.id}", "${data.aws_subnet.east2.id}"]
}

resource "aws_lb_target_group" "target" {
  name     = "${var.name}-targets"
  port     = 80
  protocol = "HTTP"
  vpc_id   = "${data.aws_vpc.default.id}"
}

resource "aws_lb_listener" "lb_listener1" {
  load_balancer_arn = "${aws_lb.load_balancer.arn}"
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = "${data.aws_acm_certificate.certificate.arn}"

  default_action {
    target_group_arn = "${aws_lb_target_group.target.arn}"
    type             = "forward"
  }
}

resource "aws_lb_listener" "lb_listener2" {
  load_balancer_arn = "${aws_lb.load_balancer.arn}"
  port              = "80"
  protocol          = "HTTP"

  default_action {
    target_group_arn = "${aws_lb_target_group.target.arn}"
    type             = "forward"
  }
}

resource "aws_autoscaling_group" "autoscaling" {
  name                 = "${var.name}"
  force_delete         = true
  max_size             = "2"
  min_size             = "2"
  launch_configuration = "${aws_launch_configuration.launch.name}"
  availability_zones   = ["${data.aws_availability_zone.zone.name}"]
  target_group_arns    = ["${aws_lb_target_group.target.arn}"]

  lifecycle {
    create_before_destroy = true
  }

  tag {
    key                 = "Name"
    value               = "${var.name}"
    propagate_at_launch = true
  }
}

resource "aws_db_instance" "db_instance" {
  identifier             = "${var.name}"
  allocated_storage      = "5"
  storage_type           = "gp2"
  engine                 = "postgres"
  engine_version         = "9.6.6"
  instance_class         = "db.t2.micro"
  vpc_security_group_ids = ["${aws_security_group.db_security_group.id}"]

  final_snapshot_identifier = "${var.name}-final-snapshot-${random_id.database_password.hex}"

  name     = "${var.name}"
  username = "${var.username}"
  password = "${random_id.database_password.hex}"
}

resource "aws_codedeploy_app" "application" {
  name = "${var.name}"
}

resource "aws_codedeploy_deployment_group" "deployment" {
  app_name              = "${aws_codedeploy_app.application.name}"
  deployment_group_name = "production"
  service_role_arn      = "${aws_iam_role.deployment.arn}"
  autoscaling_groups    = ["${aws_autoscaling_group.autoscaling.id}"]

  deployment_style {
    deployment_option = "WITHOUT_TRAFFIC_CONTROL"
    deployment_type   = "IN_PLACE"
  }
}

output "database_username" {
  value = "${aws_db_instance.db_instance.username}"
}

output "database_address" {
  value = "${aws_db_instance.db_instance.address}"
}

output "database_password" {
  value = "${aws_db_instance.db_instance.password}"
}

output "dns_name" {
  value = "${aws_lb.load_balancer.dns_name}"
}
