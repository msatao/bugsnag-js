When("I navigate to the URL {string} in {string}") do |url, browser|
  steps %Q{
    When I set environment variable "URL" to "#{url}"
    And I run the script "features/scripts/remote_browser_page_load.js" synchronously
  }
end
