import { useEffect, useState } from "react";

const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [showPasswords, setShowPasswords] = useState(false);

  useEffect(() => {
    const passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const ShowPassword = () => {
    setShowPasswords(!showPasswords);
  };

  const savePassword = () => {
    const newPasswords = [...passwordArray, form];
    setPasswordArray(newPasswords);
    localStorage.setItem("passwords", JSON.stringify(newPasswords));
    console.log(newPasswords);
  };

  const deletePassword = (index) => {
    const newPasswords = passwordArray.filter((_, i) => i !== index);
    setPasswordArray(newPasswords);
    localStorage.setItem("passwords", JSON.stringify(newPasswords));
  };

  const copyToClipboard = (username, password) => {
    const text = `Username: ${username}\nPassword: ${password}`;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Copied to clipboard");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700">&lt;</span>i
          <span className="text-green-700">Manage/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own password Manager
        </p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            onChange={handleChange}
            value={form.site}
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            placeholder="Enter website url"
          />
          <div className="flex w-full justify-between gap-8">
            <input
              onChange={handleChange}
              value={form.username}
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              placeholder="Username"
            />
            <input
              onChange={handleChange}
              value={form.password}
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          {/* Flex container to align buttons horizontally */}
          <div className="flex gap-4">
            <button
              onClick={savePassword}
              className="flex justify-center border border-green-900 items-center gap-2 hover:bg-green-300 bg-green-500 rounded-full px-4 py-2 w-fit">
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"></lord-icon>
              Add Password
            </button>
            <button
              className="flex justify-center border border-green-900 items-center gap-2 hover:bg-green-300 bg-green-500 rounded-full px-4 py-2 w-fit"
              onClick={ShowPassword}>
              <img
                src="/unlocked.png"
                style={{ height: "25px", width: "25px" }}
              />
              {showPasswords ? "Hide Passwords" : "Show Passwords"}
            </button>
          </div>
        </div>
        <div className="information pb-8">
          <h2 className="text-2xl font-bold py-4 text-center">
            Your Passwords
          </h2>
          {passwordArray.length === 0 && (
            <div className="text-center">No passwords to show</div>
          )}
          {passwordArray.length !== 0 && (
            <div className="overflow-x-auto">
              <table className="table-auto w-full rounded-md overflow-hidden">
                <thead className="bg-green-800 text-white">
                  <tr>
                    <th className="py-2">Site</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100">
                  {passwordArray.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center min-w-32 py-2 border border-green-300">
                        <a
                          href={item.site}
                          target="_blank"
                          rel="noopener noreferrer">
                          {item.site}
                        </a>
                      </td>
                      <td className="text-center min-w-32 py-2 border border-green-300">
                        {item.username}
                      </td>
                      <td className="text-center min-w-32 py-2 border border-green-300">
                        {showPasswords ? item.password : "********"}
                      </td>
                      <td className="text-center min-w-32 py-2 border border-green-300 cursor-pointer">
                        <lord-icon
                          onClick={() => deletePassword(index)}
                          src="https://cdn.lordicon.com/wpyrrmcq.json"
                          trigger="hover"></lord-icon>
                        <lord-icon
                          onClick={() =>
                            copyToClipboard(item.username, item.password)
                          }
                          src="https://cdn.lordicon.com/vdjwmfqs.json"
                          trigger="hover"></lord-icon>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
