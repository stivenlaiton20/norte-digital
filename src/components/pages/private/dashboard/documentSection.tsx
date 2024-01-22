"use client";

import { Button } from "@/components/core/button";
import { Input } from "@/components/core/input";
import { Label } from "@/components/core/label";
import { useEffect, useState } from "react";
import { useForm, Controller, useFormContext } from "react-hook-form";
import { clientsList, branchOffice } from "@/db/db";
import Select, { ActionMeta, SingleValue } from "react-select";

const DocumentSection = () => {
  const { control, setValue, watch } = useFormContext();
  const [selectedCurrency, setSelectedCurrency] = useState("");

  type SelectedOption = {
    value: string;
    currency: string;
  };
  const handleBranchOfficeChange = (
    newValue: SingleValue<{ value: string; label: string; currency: string }>,
    actionMeta: ActionMeta<{ value: string; label: string; currency: string }>
  ) => {
    if (newValue && newValue.value) {
      const selectedOption: SelectedOption = {
        value: newValue.value,
        currency: newValue.currency,
      };

      setValue("branch-office", selectedOption.value);
      setValue("currency", selectedOption.currency);
    }
  };
  useEffect(() => {
    const selectedBranch = branchOffice.find(
      (office) => office.value === watch("branch-office")
    );
    if (selectedBranch) {
      setSelectedCurrency(selectedBranch.currency);
    }
  }, [watch("branch-office"), branchOffice]);

  return (
    <>
      <div className="flex ">
        <div className=" w-screen">
          <Label name="Client" />
          <div className="flex">
            <Controller
              name="client"
              control={control}
              render={() => (
                <Select
                  className="w-80"
                  options={clientsList}
                  placeholder="Select a client"
                />
              )}
            />
            <Button>
              <span className="text-white">+</span>
            </Button>
          </div>
        </div>

        <div className="ml-10 w-screen">
          <Label name="Branch office" />
          <div className="flex">
            <Controller
              name="branch-office"
              control={control}
              render={() => (
                <Select
                  className="w-80"
                  options={branchOffice}
                  placeholder=""
                  onChange={handleBranchOfficeChange}
                />
              )}
            />
          </div>
        </div>
        <div className="ml-10 w-screen">
          <Label name="Currency" />
          <div className="flex">
            <Controller
              name="currency"
              control={control}
              render={() => (
                <Input
                  readOnly={true}
                  value={selectedCurrency}
                  className="max-w-96 "
                />
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};
DocumentSection.displayName = "DocumentSection";
export { DocumentSection };
