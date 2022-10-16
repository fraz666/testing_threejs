defmodule ThreeServerWeb.RoomView do
  use ThreeServerWeb, :view

  def render("ack.json", %{success: success, message: message}),
    do: %{
      success: success,
      message: message
    }
end
