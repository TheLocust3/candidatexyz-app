class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def as_json(options)
    camelize_keys(super(options))
  end

  private
  def camelize_keys(hash)
    values = hash.map do |key, value|
      [key.camelize(:lower), value]
    end
    
    Hash[values]
  end
end
