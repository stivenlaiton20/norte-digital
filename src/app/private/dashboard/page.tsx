"use client";

import React from "react";
import { DetailsSeccion } from "@/components/pages/private/dashboard/detailsSeccion";
import { DocumentSection } from "@/components/pages/private/dashboard/documentSection";
import { MainPanel } from "@/components/pages/private/dashboard/mainPanel";
import { SubPanel } from "@/components/pages/private/dashboard/subPanel";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

const Page = () => {
  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log("Datos enviados:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MainPanel title={"New Sale"} />
        <SubPanel title={"Document"} />
        <DocumentSection />
        <SubPanel title={"Details"} />
        <DetailsSeccion />
      </form>
    </FormProvider>
  );
};

export default Page;
