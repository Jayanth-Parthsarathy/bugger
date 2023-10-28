import BanUser from "@/components/custom/admin/banuser";
import { api } from "@/trpc/server";
import Link from "next/link";
import React from "react";


const MemberListing = async () => {
  const users = await api.member.getAllMembers.query();
  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-semibold">User Listing</h2>
      <ul className="divide-y divide-gray-300">
        {users.map((user) => (
          <li key={user.id} className="py-4">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                  <img
                    src={user.image ?? ""}
                    alt={`${user.name}'s avatar`}
                    className="h-12 w-12 rounded-full"
                  />
                </div>
                <div className="ml-4">
                  <Link href={`/admin/member/${user.id}`}>
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                  </Link>
                  <p className="text-gray-500">{user.email}</p>
                </div>
              </div>
              <BanUser user={user} userId={user.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberListing;
