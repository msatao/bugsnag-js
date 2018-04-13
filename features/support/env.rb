# Any 'run once' setup should go here as this file is evaluated
# when the environment loads.
# Any helper functions added here will be available in step
# definitions

# install rubygems
run_required_commands([
  ['bundle', 'install'],
])

# install node_modules
Dir.chdir('features/fixtures') do
  run_required_commands([
    ['npm', 'install', '--no-package-lock'],
  ])
end

# start the web server
pid = Process.spawn('features/fixtures/node_modules/.bin/serve --port=53621 features/fixtures',
  :out => '/dev/null',
  :err => '/dev/null',
)
Process.detach pid

require 'browserstack/local'
bs_local = BrowserStack::Local.new
bs_local_args = {
  'key' => ENV['BROWSER_STACK_ACCESS_KEY'],
  'v' => 'true',
  'force' => 'true',
  'localIdentifier' => ENV['BROWSERSTACK_LOCAL_IDENTIFIER'] || 'mazzzzeee'
}

bs_local.start(bs_local_args)

# Scenario hooks
Before do
  # Runs before every Scenario
end

After do
  # Runs after every Scenario
end

at_exit do
  # Runs when the test run is completed
  bs_local.stop
  begin
    Process.kill('HUP', pid)
  rescue
  end
end
