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

  create_table "user", id: false, force: :cascade do |t|
    t.string   "user_id",       limit: 32
    t.string   "first_name",    limit: 128
    t.string   "last_name",     limit: 128
    t.string   "profile_image", limit: 256
    t.string   "email_address", limit: 256, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "user", ["email_address"], name: "user_email_address_uindex", unique: true
  add_index "user", ["user_id"], name: "user_user_id", unique: true

end
