defmodule ThreeServerWeb.UsersSocket do
  use Phoenix.Socket

  @impl true
  def connect(_params, socket, _connect_info) do
    {:ok, socket}
  end

  channel "game", ThreeServerWeb.UsersChannel

  @impl true
  def id(_socket), do: nil
end

defmodule ThreeServerWeb.UsersChannel do
  use Phoenix.Channel

  def join("game", _message, socket) do
    {:ok, socket}
  end


  def handle_in("player-joined", body, socket) do
    broadcast!(socket, "player-joined", body)
    {:noreply, socket}
  end
end
