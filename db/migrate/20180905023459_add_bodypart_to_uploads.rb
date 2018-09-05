class AddBodypartToUploads < ActiveRecord::Migration[5.2]
  def change
    add_column :uploads, :bodypart, :string
  end
end
