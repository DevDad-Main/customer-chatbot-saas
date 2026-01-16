"use client";

import InitialForm from "@/components/dashboard/initial-form";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [isMetaDataAvailable, setIsMetaDataAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetaData = async () => {
      const response = await fetch("/api/metadata/fetch");
      const data = await response.json();
      setIsMetaDataAvailable(data.exists);
      setIsLoading(false);
    };
    fetchMetaData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex w-full items-center justify-center p-4" />
    );
  }

  return (
    <div className="flex-1 flex w-full">
      {!isMetaDataAvailable ? (
        <div className="w-full flex items-center justify-center p-4 min-h-screen">
          <InitialForm />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Page;
