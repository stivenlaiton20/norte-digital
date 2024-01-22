"use client";

import { Button } from "@/components/core/button";
import { Input } from "@/components/core/input";
import { Label } from "@/components/core/label";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import { suggestions } from "@/db/db";

import { ventas, saveToDBVentas } from "@/db/dbVentas";
const DetailsSeccion = () => {
  type Section = {
    name: string;
    quantity: string;
    price: string | number;
    subtotal: string | number;
  };
  type CalculateAndUpdateTotal = (sections: Section[]) => void;
  type CurrencyPrice = {
    currency: string;
    price: number;
  };

  type ProductInfo = {
    value: string;
    label: string;
    moneda: CurrencyPrice[];
  };
  type CurrencyInfo = {
    currency: string;
    price: number;
  };
  type IndexType = number | string;
  type FieldType = string;
  type ValueType = number | string | boolean;

  type UpdateFunction = (
    index: IndexType,
    field: FieldType,
    value: ValueType
  ) => void;

  const { control, setValue, watch, getValues } = useFormContext();
  const [sections, setSections] = useState<Section[]>(() => [
    { name: "", quantity: "", price: "", subtotal: "" },
  ]);

  const addSection = () => {
    const newSection = { name: "", quantity: "", price: "", subtotal: "" };
    setSections((prevSections) => {
      const updatedSections = [...prevSections, newSection];
      setValue("sections", updatedSections);

      return updatedSections;
    });
  };

  const watchCurrency = watch(`currency`);
  useEffect(() => {
    setSections((prevSections) => {
      const updatedSections = prevSections.map((section) => {
        const suggestion = suggestions.find(
          (item) => item.value === section.name
        );
        const newPrice = suggestion
          ? suggestion.moneda.find((m) => m.currency === watchCurrency)
              ?.price || section.price
          : section.price;
        const newSubtotal = Number(section.quantity) * Number(newPrice);
        return {
          ...section,
          price: newPrice,
          subtotal: newSubtotal,
        };
      });
      setValue("sections", updatedSections);
      const newTotal = updatedSections.reduce(
        (total, section) => total + section.subtotal,
        0
      );
      setValue("total", newTotal);

      return updatedSections;
    });
  }, [watchCurrency]);

  const calculateAndUpdateTotal: CalculateAndUpdateTotal = (sections) => {
    const newTotal = sections.reduce((total, section) => {
      const subtotal = parseFloat(section.subtotal as string);
      const currentTotal =
        typeof total === "number" ? total : parseFloat(total);
      if (!isNaN(subtotal) && !isNaN(currentTotal)) {
        return currentTotal + subtotal;
      }
      return total;
    }, 0);

    setValue("total", newTotal);
  };

  const removeSection = (index: number) => {
    setSections((prevSections) => {
      const subtotalToRemove = parseFloat(
        prevSections[index]?.subtotal.toString() || "0"
      );
      setValue(
        "total",
        (prevTotal: number) =>
          prevTotal - (isNaN(subtotalToRemove) ? 0 : subtotalToRemove)
      );
      const newSections = [...prevSections];
      newSections.splice(index, 1);
      setValue("sections", newSections);
      calculateAndUpdateTotal(newSections);
      return newSections;
    });
  };

  const updateSection = (index: number, field: keyof Section, value: any) => {
    setSections((prevSections) => {
      const newSections = [...prevSections];
      newSections[index][field] = value;
      setValue("sections", newSections);
      return newSections;
    });
  };

  const getPriceForProductAndCurrency = (
    product: string,
    currency: string
  ): number | undefined => {
    const productInfo: ProductInfo | undefined = suggestions.find(
      (item) => item.value === product
    );

    if (productInfo) {
      const currencyInfo: CurrencyInfo | undefined = productInfo.moneda.find(
        (info) => info.currency === currency
      );

      if (currencyInfo) {
        return currencyInfo.price;
      }
    }
    return undefined;
  };

  const updateName: UpdateFunction = (index, field, value) => {
    setSections((prevSections) => {
      const newSections = [...prevSections];
      newSections[index][field] = value;
      newSections[index]["quantity"] = 0;
      newSections[index]["subtotal"] = 0;
      if (watchCurrency !== undefined) {
        if (newSections[index].name !== undefined) {
          let price = getPriceForProductAndCurrency(
            newSections[index].name,
            watchCurrency
          );
          newSections[index]["price"] = price;
        }
      }
      setValue("sections", newSections);
      calculateAndUpdateTotal(newSections);

      return newSections;
    });
  };
  const updateQuantity: UpdateFunction = (index, field, value) => {
    setSections((prevSections) => {
      const newSections = [...prevSections];
      newSections[index][field] = value;
      setValue("total", 0);

      if (watchCurrency !== undefined && sections[index].name !== undefined) {
        let price = getPriceForProductAndCurrency(
          sections[index].name,
          watchCurrency
        );
        let subtotal = price * value;
        newSections[index]["subtotal"] = subtotal;

        let total = 0;
        newSections.forEach((section) => {
          const subtotalValue = parseFloat(section.subtotal || 0);
          total += isNaN(subtotalValue) ? 0 : subtotalValue;
        });
        setValue("total", total);
      }

      return newSections;
    });
  };

  const hanldeSend = () => {
    const dataToSave = {
      sections: sections,
    };
    saveToDBVentas(dataToSave);
  };

  return (
    <>
      {sections.map((section, index) => (
        <div key={index} className="flex">
          <div className="w-screen">
            <Label name="Name" />
            <div className="flex">
              <Controller
                name={`sections[${index}].name`}
                control={control}
                render={() => (
                  <Select
                    isDisabled={watchCurrency ? false : true}
                    className="w-80"
                    options={suggestions}
                    onChange={(selectedOption) =>
                      updateName(index, "name", selectedOption.value)
                    }
                  />
                )}
              />
            </div>
          </div>
          <div className="ml-10 w-screen">
            <Label name="Quantity" />
            <div className="flex">
              <Controller
                name={`sections[${index}].quantity`}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type="number"
                    className="max-w-96"
                    {...field}
                    value={section.quantity}
                    onChange={(e) =>
                      updateQuantity(index, "quantity", e.target.value)
                    }
                  />
                )}
              />
            </div>
          </div>
          <div className="ml-10 w-screen">
            <Label name="Price" />
            <div className="flex">
              <Controller
                name={`sections[${index}].price`}
                control={control}
                render={() => (
                  <Input
                    readOnly={true}
                    className="max-w-96"
                    value={section.price}
                  />
                )}
              />
            </div>
          </div>
          <div className="ml-10 w-screen">
            <Label name="SubTotal" />
            <div className="flex">
              <Controller
                name={`sections[${index}].subtotal`}
                control={control}
                defaultValue=""
                render={() => (
                  <Input
                    readOnly={true}
                    className="max-w-96"
                    value={section.subtotal}
                    onChange={(e) =>
                      updateSection(index, "subtotal", e.target.value)
                    }
                  />
                )}
              />
            </div>
          </div>
          <div className="ml-10 w-screen mt-6">
            <Button onClick={() => removeSection(index)}>
              <span className="text-white">x</span>
            </Button>
          </div>
        </div>
      ))}

      <Button onClick={addSection}>
        <span className="text-white">Add</span>
      </Button>
      <div className="flex  justify-start">
        <div className="flex  justify-end ml-10 w-screen">
          <div className="mt-2 mr-4">
            <Label style={{ marginTop: "20px" }} name="Total" />
          </div>

          <div className="flex  justify-end">
            <Controller
              name={`total`}
              control={control}
              defaultValue=""
              render={() => (
                <Input
                  readOnly={true}
                  className="max-w-96 "
                  value={getValues("total")}
                />
              )}
            />
          </div>
        </div>
      </div>

      <div className="flex mt-10  justify-end">
        <button
          className="pt-3 pl-10 pr-10 pb-3  bg-[#2196f3] rounded-no  text-white mt-10 "
          onClick={hanldeSend}
        >
          <span className="text-white ">enviar</span>
        </button>
      </div>
    </>
  );
};
DetailsSeccion.displayName = "DetailsSeccion";
export { DetailsSeccion };
