
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/components/ui/use-toast";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  const { toast } = useToast();

  // Function to add a new quantity-price pair
  const handleAddQuantityPrice = () => {
    const quantity = formData.quantity?.trim();
    const price = formData.quantityPrice?.trim();

    if (!quantity || !price) {
      toast({ title: "Please enter both quantity and price." });
      return;
    }

    const updatedQuantityPrices = [
      ...formData.quantityPrices,
      { quantity, price },
    ];

    setFormData({
      ...formData,
      quantityPrices: updatedQuantityPrices,
      quantity: "", // Reset quantity input
      quantityPrice: "", // Reset quantity price input
    });
  };

  // Function to handle changes for existing quantity-price pairs
  const handleQuantityPriceChange = (index, field, value) => {
    const updatedQuantityPrices = formData.quantityPrices.map((item, idx) =>
      idx === index ? { ...item, [field]: value.trim() } : item
    );

    setFormData({
      ...formData,
      quantityPrices: updatedQuantityPrices,
    });
  };

  // Function to handle deleting a specific quantity-price pair
  const handleDeleteQuantityPrice = (index) => {
    const updatedQuantityPrices = formData.quantityPrices.filter((_, idx) => idx !== index);
    setFormData({
      ...formData,
      quantityPrices: updatedQuantityPrices,
    });
  };


  // Render input fields based on control type
  function renderInputsByComponentType(getControlItem) {
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        return (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
      case "select":
        return (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options?.map((optionItem) => (
                <SelectItem key={optionItem.id} value={optionItem.id}>
                  {optionItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "textarea":
        return (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
      default:
        return (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls?.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {controlItem.componentType === "quantity-price-input" ? (
              <>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    name="quantity"
                    placeholder="Enter quantity (optional)"
                    value={formData.quantity || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                  />
                  <Input
                    type="number"
                    name="quantityPrice"
                    placeholder="Enter price for quantity (optional)"
                    value={formData.quantityPrice || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, quantityPrice: e.target.value })
                    }
                  />
                  <Button
                    type="button"
                    onClick={handleAddQuantityPrice}
                  >
                    Add
                  </Button>
                </div>
                <div className="mt-3">
                  {formData.quantityPrices?.length > 0 ? (
                    formData.quantityPrices.map((item, index) => (
                      <div key={index} className="flex gap-3 mb-1">
                        <Input
                          type="number"
                          placeholder="Quantity"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityPriceChange(index, "quantity", e.target.value)
                          }
                        />
                        <Input
                          type="number"
                          placeholder="Price"
                          value={item.price}
                          onChange={(e) =>
                            handleQuantityPriceChange(index, "price", e.target.value)
                          }
                        />
                         <Button
                          variant="destructive"
                          onClick={() => handleDeleteQuantityPrice(index)}
                        >
                          Delete
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p>No quantity-price pairs added yet.</p>
                  )}
                </div>
              </>
            ) : (
              renderInputsByComponentType(controlItem)
            )}
          </div>
        ))}
      </div>
      <Button type="submit" className="mt-2 w-full" disabled={isBtnDisabled}>
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;

