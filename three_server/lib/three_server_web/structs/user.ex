defmodule ThreeServerWeb.User do
  defstruct id: nil, position: nil, socket_id: nil

  def init_user(socket_id) do
    %ThreeServerWeb.User{
      id: UUID.uuid4(),
      socket_id: socket_id,
      position: %ThreeServerWeb.UserPosition{}
    }
  end
end
