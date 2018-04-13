Feature: Hello remote world

Scenario: A remote browser makes a request
  When I navigate to the URL "http://localhost:53621" in "firefox"
  Then I should receive a request
