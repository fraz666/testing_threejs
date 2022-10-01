import Config

# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :three_server, ThreeServer.Repo,
  username: "postgres",
  password: "postgres",
  hostname: "localhost",
  database: "three_server_test#{System.get_env("MIX_TEST_PARTITION")}",
  pool: Ecto.Adapters.SQL.Sandbox,
  pool_size: 10

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :three_server, ThreeServerWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "/IYpx0kM9RyYrGLdkUmYDfQCQ+XrjWf5aQBPRD4T4kXR5c4qvK1NLVIgCCY9cMGd",
  server: false

# In test we don't send emails.
config :three_server, ThreeServer.Mailer, adapter: Swoosh.Adapters.Test

# Print only warnings and errors during test
config :logger, level: :warn

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
