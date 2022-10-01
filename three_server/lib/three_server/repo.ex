defmodule ThreeServer.Repo do
  use Ecto.Repo,
    otp_app: :three_server,
    adapter: Ecto.Adapters.Postgres
end
