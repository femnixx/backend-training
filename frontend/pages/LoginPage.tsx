const LoginPage = () => {
  return (
    <>
      <div className=" bg-gray-400 ms-4">
        <div className="bg-white flex flex-col">
          <p className="text-center mt-5">Welcome back</p>
          <div className="gap-y-3">
            <p>Email</p>
            <input
              type="email"
              className="border-1 rounded-lg px-2"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="gap-y-3">
            <p>Password</p>
            <input
              type="password"
              className="border-1 rounded-lg px-2"
              placeholder="****"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
