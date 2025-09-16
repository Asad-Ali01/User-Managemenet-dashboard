import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { Table, Modal } from "antd";
import type { ColumnType } from "antd/es/table";
import type { User, UserRow } from "./Interface";
import { useState } from "react";
import UserDetails from "./UserDetails";
import { motion } from "framer-motion";
function UserBasicInfo() {
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);
  const [rowID, setRowID] = useState<string | undefined>(undefined);
  const fetchUsers = async (): Promise<User[]> => {
    const res = await axios.get("http://localhost:3000/users");
    return res.data;
  };
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  // User details
  const { data: UserDetailsData, isLoading: UserDetailsLoading } =
    UserDetails(rowID);
  console.log(data);
  if (isLoading) {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <Spin size="large" />
      </div>
    );
  }
  if (isError) {
    console.log("Error is: ", error);
  }
  //becuase data can be empty before fetch we add (data || [])
  const dataSource: UserRow[] = (data || [])?.map((row: User): UserRow => {
    return {
      key: row.id,
      name: row.name,
      email: row.email,
      company: row.company.name,
    };
  });
  // console.log("Row is : ",dataSource);

  const columns: ColumnType<UserRow>[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
  ];
  return (
    <div className="dark:bg-gray-800 flex flex-col  h-full ">
      <h1 className="font-bold text-xl my-7 mx-2 text-center">
        Click any row to view user details.
      </h1>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Table
          dataSource={dataSource}
          scroll={{ x: "max-content" }} // enables horizontal scrolling
          columns={columns}
          pagination={{ pageSize: 5 }}
          
         
        bordered={false}
          rowClassName={`dark:!bg-gray-700 dark:!border-none dark:!hover:bg-red-400`}
          onRow={(record) => {
            return {
              onClick: () => {
                setisModalOpen(true);
                console.log(record);
                setRowID(record.key);
              },
              style: { cursor: "pointer" },

            };
          }}
        />
      </motion.div>
      <Modal
        open={isModalOpen}
        title="User Details"
        onOk={() => setisModalOpen(false)}
        onCancel={() => setisModalOpen(false)}
        cancelButtonProps={{ style: { display: "none" } }}
        centered
        classNames={{
          content:
            "dark:!bg-gray-800 dark:!border-gray-700 dark:!text-white ",
          header: "dark:!bg-gray-800 dark:!border-gray-700 dark:!text-white",
          body: "dark:!bg-gray-800 dark:!text-white dark:!scrollbar-thin dark:!scrollbar-thumb-gray-600 dark:!scrollbar-track-gray-900",
          // footer: "dark:!bg-gray-800 dark:!border-gray-700",
          mask: "!bg-black/70",
        }}
        styles={{
          body: {
            maxHeight: "60vh",
            overflow: "auto",
          },
        }}
      >
        {UserDetailsLoading ? (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <Spin size="large" />
          </div>
        ) : (
          UserDetailsData && (
            <>
              <div className="grid grid-cols-2 gap-2">
                <h1 className="text-lg font-bold">Id:</h1>
                <p className="text-lg">{UserDetailsData.id}</p>

                <h1 className="text-lg font-bold">User Name:</h1>
                <p className="text-lg">{UserDetailsData.username}</p>

                <h1 className="text-lg font-bold">Phone:</h1>
                <p className="text-lg">{UserDetailsData.phone}</p>

                <h1 className="text-lg font-bold">Website:</h1>
                <p className="text-lg">{UserDetailsData.website}</p>

                <h1 className="text-lg font-bold">Name:</h1>
                <p className="text-lg">{UserDetailsData.name}</p>

                <h1 className="text-lg font-bold">Email:</h1>
                <p className="text-lg">{UserDetailsData.email}</p>

                <h1 className="text-lg font-bold text-center col-span-2">
                  Company Details:
                </h1>
                {/* <p></p> */}

                <h1 className="text-lg font-bold ">Company Name: </h1>
                <p className="text-lg">{UserDetailsData.company.name}</p>

                <h1 className="text-lg font-bold ">Company Catch Phrase: </h1>
                <p className="text-lg">{UserDetailsData.company.catchPhrase}</p>

                <h1 className="text-lg font-bold ">Company bs: </h1>
                <p className="text-lg">{UserDetailsData.company.bs}</p>

                <h1 className="text-lg font-bold col-span-2 text-center">
                  Address{" "}
                </h1>

                <h1 className="text-lg font-bold ">Street: </h1>
                <p className="text-lg">{UserDetailsData.address.street}</p>

                <h1 className="text-lg font-bold ">Suite: </h1>
                <p className="text-lg">{UserDetailsData.address.suite}</p>

                <h1 className="text-lg font-bold ">City: </h1>
                <p className="text-lg">{UserDetailsData.address.city}</p>

                <h1 className="text-lg font-bold ">Zip Code: </h1>
                <p className="text-lg">{UserDetailsData.address.zipcode}</p>

                <h1 className="text-lg font-bold col-span-2 text-center">
                  Address geo{" "}
                </h1>

                <h1 className="text-lg font-bold ">latitude: </h1>
                <p className="text-lg">{UserDetailsData.address.geo.lat}</p>

                <h1 className="text-lg font-bold ">longitude: </h1>
                <p className="text-lg">{UserDetailsData.address.geo.lng}</p>
              </div>
            </>
          )
        )}
      </Modal>
    </div>
  );
}

export default UserBasicInfo;
