class CreateApps < ActiveRecord::Migration
  def change
    create_table :apps do |t|
      t.string :name

      t.timestamps
    end
    add_index :apps, :name

    add_index :apps, :updated_at
    add_index :apps, :created_at
  end
end
