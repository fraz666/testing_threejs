defmodule ThreeServerWeb.RoomController do
  use ThreeServerWeb, :controller

  def ping(conn, _params) do
    conn
    |> render("ack.json", %{
      success: true,
      message: "Hello world!"
    })
  end
end
