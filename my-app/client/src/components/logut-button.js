function Logout({ incomingSetCurrentUser, incomingCurrentLink }) {
  const logoutUser = async () => {
    try {
      const res = await fetch(`${incomingCurrentLink}/api/v1/auth/logout`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = res.json();

      if (res.ok) {
        console.log(data.msg);
        incomingSetCurrentUser(undefined);
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
        className="border-1 rounded-1 p-1 h-full bg-red-700 hover:bg-transparent"
        onClick={() => {
          logoutUser();
        }}
      >
        ➜]
      </button>
    </>
  );
}

export default Logout;
