import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { userDetails } from "./Interface";
import axios from "axios";
import Input from "antd/es/input/Input";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {Spin} from 'antd'
function EditUser() {
  const { userID } = useParams<{ userID: string }>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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
    setId("");
    setName("");
    setUserName("");
    setEmail("");
    setStreet("");
    setSuite("");
    setCity("");
    setZipCode("");
    setLat("");
    setLng("");
    setPhone("");
    setWebsite("");
    setCompanyName("");
    setCatchPhrase("");
    setBs("");
  };

  //   Getting data
  const fetchUser = async () => {
    const res = await axios.get(`http://localhost:3000/users/${userID}`);
    return res.data;
  };
  const { isLoading, data } = useQuery({
    queryKey: ["users", userID],
    queryFn: fetchUser,
    enabled: !!userID,
  });

  useEffect(() => {
    if (data) {
      setId(data.id);
      setName(data.name);
      setUserName(data.username);
      setEmail(data.email);
      setStreet(data.address.street);
      setSuite(data.address.suite);
      setCity(data.address.city);
      setZipCode(data.address.zipcode);
      setLat(data.address.geo.lat);
      setLng(data.address.geo.lng);
      setPhone(data.phone);
      setWebsite(data.website);
      setCompanyName(data.company.name);
      setCatchPhrase(data.company.catchPhrase);
      setBs(data.company.bs);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: async (updatedUser: userDetails) => {
        return await axios.put(`http://localhost:3000/users/${userID}`, updatedUser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      resetForm();
      navigate("/dashboard");
    },
   
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
  if(isLoading){
    
   return ( <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <Spin size="large" />
      </div>)
  }
  return (
    <div className=" py-5   grid  h-full place-items-center">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 mx-12 sm:grid-cols-3   gap-5 "
      >
        <Input
          className="border-2 dark:!border-none pl-1 dark:!bg-gray-700  dark:!text-white  dark:focus:!ring-1 dark:focus:!ring-blue-500 focus:!shadow-none dark:!placeholder-gray-500 dark:focus:!text-black dark:focus:!bg-white dark:focus:caret-black"
          id="id"
          name="id"
          type="text"
          value={data.id || id}
          placeholder="Enter Id"
          size="large"
          required
          onChange={(e) => setId(e.target.value)}
        />

        <Input
          className="border-2 dark:!border-none pl-1 dark:!bg-gray-700  dark:!text-white  dark:focus:!ring-1 dark:focus:!ring-blue-500 focus:!shadow-none dark:!placeholder-gray-500 dark:focus:!text-black dark:focus:!bg-white dark:focus:caret-black"
          id="name"
          name="name"
          type="text"
          value={data.name || name}
          placeholder="Enter name"
          size="large"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          className="border-2 dark:!border-none pl-1 dark:!bg-gray-700  dark:!text-white  dark:focus:!ring-1 dark:focus:!ring-blue-500 focus:!shadow-none dark:!placeholder-gray-500 dark:focus:!text-black dark:focus:!bg-white dark:focus:caret-black"
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
          className="border-2 dark:!border-none pl-1 dark:!bg-gray-700  dark:!text-white  dark:focus:!ring-1 dark:focus:!ring-blue-500 focus:!shadow-none dark:!placeholder-gray-500 dark:focus:!text-black dark:focus:!bg-white dark:focus:caret-black"
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
          className="border-2 dark:!border-none pl-1 dark:!bg-gray-700  dark:!text-white  dark:focus:!ring-1 dark:focus:!ring-blue-500 focus:!shadow-none dark:!placeholder-gray-500 dark:focus:!text-black dark:focus:!bg-white dark:focus:caret-black"
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
          className="border-2 dark:!border-none pl-1 dark:!bg-gray-700  dark:!text-white  dark:focus:!ring-1 dark:focus:!ring-blue-500 focus:!shadow-none dark:!placeholder-gray-500 dark:focus:!text-black dark:focus:!bg-white dark:focus:caret-black"
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
          className="border-2 dark:!border-none pl-1 dark:!bg-gray-700  dark:!text-white  dark:focus:!ring-1 dark:focus:!ring-blue-500 focus:!shadow-none dark:!placeholder-gray-500 dark:focus:!text-black dark:focus:!bg-white dark:focus:caret-black"
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
          className="border-2 dark:!border-none pl-1 dark:!bg-gray-700  dark:!text-white  dark:focus:!ring-1 dark:focus:!ring-blue-500 focus:!shadow-none dark:!placeholder-gray-500 dark:focus:!text-black dark:focus:!bg-white dark:focus:caret-black"
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
          className="border-2 dark:!border-none pl-1 dark:!bg-gray-700  dark:!text-white  dark:focus:!ring-1 dark:focus:!ring-blue-500 focus:!shadow-none dark:!placeholder-gray-500 dark:focus:!text-black dark:focus:!bg-white dark:focus:caret-black"
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
          className="border-2 dark:!border-none pl-1 dark:!bg-gray-700  dark:!text-white  dark:focus:!ring-1 dark:focus:!ring-blue-500 focus:!shadow-none dark:!placeholder-gray-500 dark:focus:!text-black dark:focus:!bg-white dark:focus:caret-black"
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
          className="border-2 dark:!border-none pl-1 dark:!bg-gray-700  dark:!text-white  dark:focus:!ring-1 dark:focus:!ring-blue-500 focus:!shadow-none dark:!placeholder-gray-500 dark:focus:!text-black dark:focus:!bg-white dark:focus:caret-black"
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
          className="border-2 dark:!border-none pl-1 dark:!bg-gray-700  dark:!text-white  dark:focus:!ring-1 dark:focus:!ring-blue-500 focus:!shadow-none dark:!placeholder-gray-500 dark:focus:!text-black dark:focus:!bg-white dark:focus:caret-black"
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
          className="border-2 dark:!border-none pl-1 dark:!bg-gray-700  dark:!text-white  dark:focus:!ring-1 dark:focus:!ring-blue-500 focus:!shadow-none dark:!placeholder-gray-500 dark:focus:!text-black dark:focus:!bg-white dark:focus:caret-black"
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
          className="border-2 dark:!border-none pl-1 dark:!bg-gray-700  dark:!text-white  dark:focus:!ring-1 dark:focus:!ring-blue-500 focus:!shadow-none dark:!placeholder-gray-500 dark:focus:!text-black dark:focus:!bg-white dark:focus:caret-black"
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
          className="border-2 dark:!border-none pl-1 dark:!bg-gray-700  dark:!text-white  dark:focus:!ring-1 dark:focus:!ring-blue-500 focus:!shadow-none dark:!placeholder-gray-500 dark:focus:!text-black dark:focus:!bg-white dark:focus:caret-black"
          id="bs"
          name="bs"
          type="text"
          placeholder="Enter bs"
          value={bs}
          required
          size="large"
          onChange={(e) => setBs(e.target.value)}
        />

        <Button
          size="large"
          type="default"
          htmlType="submit"
          className=" w-30 dark:!bg-gray-700 dark:!text-white dark:hover:!text-blue-500"
          loading={mutation.isPending}
        >
          
          {mutation.isPending ? "Updating..." : "Update user"}
        </Button>
        {mutation.isError && (
          <p className="col-span-3">Error: {mutation.error?.message}</p>
        )}
        {mutation.isSuccess && (
          <p className="col-span-3">User updated successfully</p>
        )}
      </form>
    </div>
  );
}

export default EditUser;
