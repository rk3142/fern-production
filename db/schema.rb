# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20211031140530) do

  create_table "product_price_mapper", id: false, force: :cascade do |t|
    t.string   "product_id",   limit: 32
    t.text     "product_link"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float    "price",                   default: 0.0
  end

  create_table "product_types", primary_key: "product_type", force: :cascade do |t|
    t.string "name", limit: 128
  end

  add_index "product_types", ["product_type"], name: "idx_product_types_product_type", unique: true

  create_table "products", id: false, force: :cascade do |t|
    t.string  "product_id",          limit: 32
    t.string  "product_name",        limit: 128
    t.text    "product_description"
    t.text    "link"
    t.string  "image_url",           limit: 256
    t.string  "brand",               limit: 64
    t.float   "rating",                          default: 5.0
    t.float   "ratings",                         default: 1.0
    t.integer "product_type"
    t.float   "carbon",              limit: 2
    t.float   "water",               limit: 2
    t.float   "energy",              limit: 2
  end

  add_index "products", ["product_id"], name: "idx_product_product_id", unique: true

  create_table "spore_redemption_history", id: false, force: :cascade do |t|
    t.string   "user_id",          limit: 32
    t.string   "transaction_type", limit: 16
    t.integer  "amount"
    t.datetime "created_at"
    t.string   "milestone_type",   limit: 32
    t.string   "product_id",       limit: 32
    t.string   "invoice_id",       limit: 64
  end

  create_table "spores_milestone_mapper", primary_key: "type_id", force: :cascade do |t|
    t.string  "type_key",         limit: 32,              null: false
    t.integer "amount",                       default: 0, null: false
    t.string  "type_description", limit: 128
  end

  add_index "spores_milestone_mapper", ["type_id"], name: "sqlite_autoindex_spores_milestone_mapper_1", unique: true
  add_index "spores_milestone_mapper", ["type_key"], name: "spores_milestones_mapper_type_key_uindex", unique: true

  create_table "user", primary_key: "user_id", force: :cascade do |t|
    t.string   "first_name",          limit: 128
    t.string   "last_name",           limit: 128
    t.string   "profile_image",       limit: 256
    t.string   "email_address",       limit: 256,               null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float    "current_spore_count",             default: 0.0
  end

  add_index "user", ["email_address"], name: "user_email_address_uindex", unique: true
  add_index "user", ["user_id"], name: "sqlite_autoindex_user_1", unique: true
  add_index "user", ["user_id"], name: "user_user_id", unique: true

  create_table "user_favorite", id: false, force: :cascade do |t|
    t.string   "user_id",    limit: 32
    t.string   "product_id", limit: 32
    t.datetime "created_at"
  end

  add_index "user_favorite", ["user_id", "product_id"], name: "user_favorite_user_id_product_id_uindex", unique: true

  create_table "user_spores_count", primary_key: "user_id", force: :cascade do |t|
    t.integer  "current_spore_count"
    t.datetime "modified_at"
  end

  add_index "user_spores_count", ["user_id"], name: "sqlite_autoindex_user_spores_count_1", unique: true
  add_index "user_spores_count", ["user_id"], name: "user_spores_count_user_id_uindex", unique: true

  create_table "website_mapper", id: false, force: :cascade do |t|
    t.integer "interface_id"
    t.string  "interface_name", limit: 32
  end

end
