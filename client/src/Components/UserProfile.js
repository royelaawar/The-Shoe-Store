import React from 'react';

const User = () => {
    // Example user data - replace with real data as needed
    const fullName = "Roy Elaawar";
    const email = "johndoe@example.com";
    const phoneNumber = "(123) 456-7890";
    const address = "123 Main St, Anytown, USA 12345";
    const purchases = ["2 items"]; // Define purchase data here

    return (
        <div className="userProfile bg-white overflow-hidden shadow rounded-lg border">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">User Profile</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">This is some information about the user.</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    {/* Full Name */}
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Full name</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{fullName}</dd>
                    </div>
                    {/* Email Address */}
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Email address</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{email}</dd>
                    </div>
                    {/* Phone Number */}
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{phoneNumber}</dd>
                    </div>
                    {/* Address */}
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Address</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {address}
                        </dd>
                    </div>
                    {/* Purchases */}
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Purchases</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {purchases.map((purchase, index) => (
                                <div key={index}>{purchase}</div>
                            ))}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default User;

