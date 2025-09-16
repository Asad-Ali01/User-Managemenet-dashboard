import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import type { userDetails } from "./Interface";
import axios from "axios";
import Input from "antd/es/input/Input";
import { Button } from "antd";
function AddUser() {
  const queryClient = useQueryClient();
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [suite, setSuite] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [lat, setLat] = useState<string>("");
  const [lng, setLng] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [catchPhrase, setCatchPhrase] = useState<string>("");
  const [bs, setBs] = useState<string>("");
  const resetForm = () => {
    setId("")
    setName("")
    setUserName("")
    setEmail("")
    setStreet("")
    setSuite("")
    setCity("")
    setZipCode("")
    setLat("")
    setLng("")
    setPhone("")
    setWebsite("")
    setCompanyName("")
    setCatchPhrase("")
    setBs("")
  }
  const mutation = useMutation({
    mutationFn: async (newUser: userDetails) => {
      const existing = await axios
        .get(`http://localhost:3000/users/${newUser.id}`)
        .then((res) => res.data)
        .catch(() => null);
      if (existing) {
        throw new Error("This ID already exists.Please enter another ID.");
      }
      return await axios.post("http://localhost:3000/users", newUser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      resetForm()
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key} : ${value}`);
    // }
   
    mutation.mutate({
      id: id,
      name: name,
      username: userName,
      email: email,
      address: {
        street: street,
        suite: suite,
        city: city,
        zipcode: zipCode,
        geo: {
          lat: lat,
          lng: lng,
        },
      },
      phone: phone,
      website: website,
      company: {
        name: companyName,
        catchPhrase: catchPhrase,
        bs: bs,
      },
    });
   
  };
  return (
    <div className=" mt-15 sm:mt-0   ">
    <form onSubmit={handleSubmit} className="grid grid-cols-2 mx-12 sm:grid-cols-3   gap-5 ">
      <Input
        className="border-2 pl-1 dark:!bg-gray-700 dark:!border-none  dark:!text-white dark:!placeholder-gray-500"
        id="id"
        name="id"
        type="text"
        value={id}
        placeholder="Enter Id"
        size="large"
        required
        onChange={(e) => setId(e.target.value)}
      />

      <Input
          className="border-2 pl-1 dark:!bg-gray-700 dark:!border-none  dark:!text-white dark:!placeholder-gray-500"
        id="name"
        name="name"
        type="text"
        value={name}
        placeholder="Enter name"
        size="large"
        required
        onChange={(e) => setName(e.target.value)}
      />

      <Input
          className="border-2 pl-1 dark:!bg-gray-700 dark:!border-none  dark:!text-white dark:!placeholder-gray-500"
        id="username"
        name="username"
        type="text"
        placeholder="Enter username"
        size="large"
        value={userName}
        required
        onChange={(e) => setUserName(e.target.value)}
      />

      <Input
           className="border-2 pl-1 dark:!bg-gray-700 dark:!border-none  dark:!text-white dark:!placeholder-gray-500"
        id="email"
        name="email"
        type="text"
        placeholder="Enter email"
        value={email}
        size="large"
        required
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
           className="border-2 pl-1 dark:!bg-gray-700 dark:!border-none  dark:!text-white dark:!placeholder-gray-500"
        id="street"
        name="street"
        type="text"
        value={street}
        placeholder="Enter street"
        size="large"
        required
        onChange={(e) => setStreet(e.target.value)}
      />

      <Input
          className="border-2 pl-1 dark:!bg-gray-700 dark:!border-none  dark:!text-white dark:!placeholder-gray-500"
        id="suite"
        name="suite"
        type="text"
        value={suite}
        size="large"
        placeholder="Enter suite"
        required
        onChange={(e) => setSuite(e.target.value)}
      />

      <Input
          className="border-2 pl-1 dark:!bg-gray-700 dark:!border-none  dark:!text-white dark:!placeholder-gray-500"
        id="city"
        name="city"
        type="text"
        value={city}
        size="large"
        placeholder="Enter city"
        required
        onChange={(e) => setCity(e.target.value)}
      />

      <Input
          className="border-2 pl-1 dark:!bg-gray-700 dark:!border-none  dark:!text-white dark:!placeholder-gray-500"
        id="zipcode"
        name="zipcode"
        type="text"
        value={zipCode}
        placeholder="Enter zipcode"
        required
        size="large"
        onChange={(e) => setZipCode(e.target.value)}
      />

      <Input
          className="border-2 pl-1 dark:!bg-gray-700 dark:!border-none  dark:!text-white dark:!placeholder-gray-500"
        id="lat"
        name="lat"
        type="text"
        value={lat}
        size="large"
        placeholder="Enter latitude"
        required
        onChange={(e) => setLat(e.target.value)}
      />

      <Input
          className="border-2 pl-1 dark:!bg-gray-700 dark:!border-none  dark:!text-white dark:!placeholder-gray-500"
        id="lng"
        name="lng"
        type="text"
        value={lng}
        size="large"
        placeholder="Enter longitude"
        required
        onChange={(e) => setLng(e.target.value)}
      />

      <Input
          className="border-2 pl-1 dark:!bg-gray-700 dark:!border-none  dark:!text-white dark:!placeholder-gray-500"
        id="phone"
        name="phone"
        type="text"
        value={phone}
        placeholder="Enter phone number"
        required
        size="large"
        onChange={(e) => setPhone(e.target.value)}
      />

      <Input
           className="border-2 pl-1 dark:!bg-gray-700 dark:!border-none  dark:!text-white dark:!placeholder-gray-500"
        id="website"
        name="website"
        type="text"
        value={website}
        placeholder="Enter website"
        required
        size="large"
        onChange={(e) => setWebsite(e.target.value)}
      />

      <Input
          className="border-2 pl-1 dark:!bg-gray-700 dark:!border-none  dark:!text-white dark:!placeholder-gray-500"
        id="companyName"
        name="companyName"
        type="text"
        placeholder="Enter company name"
        value={companyName}
        required
        size="large"
        onChange={(e) => setCompanyName(e.target.value)}
      />

      <Input
          className="border-2 pl-1 dark:!bg-gray-700 dark:!border-none  dark:!text-white dark:!placeholder-gray-500"
        id="catchPhrase"
        type="text"
        name="catchPhrase"
        placeholder="Enter catch phrase"
        value={catchPhrase}
        size="large"
        required
        onChange={(e) => setCatchPhrase(e.target.value)}
      />

      <Input
         className="border-2 dark:!border-none pl-1 dark:!bg-gray-700  dark:!text-white dark:!placeholder-gray-500"
        id="bs"
        name="bs"
        type="text"
        placeholder="Enter bs"
        value={bs}
        required
        size="large"
        onChange={(e) => setBs(e.target.value)}
      />

     
      <Button size="large" type="default" htmlType="submit"  className=" w-30 dark:!bg-gray-700" loading={mutation.isPending}> {mutation.isPending ? "Adding..." : "Add new user"}</Button>
      {mutation.isError && <p className="col-span-3">Error: {mutation.error?.message}</p>}
      {mutation.isSuccess && <p className="col-span-3">User added successfully</p>}
    </form>
    </div>
  );
}

export default AddUser;
