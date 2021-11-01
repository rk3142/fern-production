
Given /the following products exist/ do |products_table|
  products_table.hashes.each do |product|
    Product.create product
  end
end

Then /I should see "(.*)" before "(.*)"/ do |e1, e2|
  #  ensure that that e1 occurs before e2.
  #  page.body is the entire content of the page as a string.
  expect(page.body.index(e1) < page.body.index(e2))
end

When /I (un)?check the following category: (.*)/ do |uncheck, category_list|
  rating_list.split(', ').each do |category|
    step %{I #{uncheck.nil? ? '' : 'un'}check "categorys_#{category}"}
  end
end
