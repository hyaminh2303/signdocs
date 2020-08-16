# frozen_string_literal: true

class CreateContentFields < ActiveRecord::Migration[5.2]
  def change
    create_table :content_fields do |t|
      t.uuid :document_id, null: false
      t.uuid :assignee_id, null: false
      t.references :contentable, polymorphic: true
      t.json :bbox, null: false
      t.timestamps
    end
    add_index :content_fields, :document_id
    add_index :content_fields, :assignee_id
  end
end