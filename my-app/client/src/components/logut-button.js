function LogoutButton({ incomingHandleCurrentUserChanges, incomingCurrentLink }) {
  const logoutUser = async () => {
    try {
      const res = await fetch(`${incomingCurrentLink}/api/v1/auth/logout`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = res.json();
      console.log(data);
      if (res.ok) {
        console.log(data.msg);
        incomingHandleCurrentUserChanges(undefined);
      } else {
        console.log(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        className="border-1 rounded-1 p-1 w-fit h-fit bg-red-700 hover:bg-transparent"
        onClick={() => {
          logoutUser();
        }}
      >
        ➜] Logout
      </button>
    </>
  );
}

export default LogoutButton;
