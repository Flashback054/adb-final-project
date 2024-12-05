import { useState } from "react";
import validateForm from "../../components/validateForm";
const AddNewProductModal = ({
  addNewProductModalWindow,
  setAddNewProductModalWindow,
  handleAddNewProduct,
}) => {
  const [formValue, setFormValue] = useState({
    ItemName: "",
    ItemImg: "",
    ItemIngredients: "",
    ItemPrice: "",
    Category: "",
  });
  const [formError, setFormError] = useState({});
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const validate = validateForm("addNewProduct");

  const handleValidation = (e) => {
    const { name, value } = e.target;
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [name]: value,
    }));
  };

  const hideAddNewProductModal = () => {
    setAddNewProductModalWindow(false);
    setFormValue({
      id: "",
      ItemImg: "",
      ItemName: "",
      ItemIngredients: "",
      ItemPrice: "",
      Category: "",
    });
    setFormError({});
    setSubmit(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setFormError(validate(formValue));
    if (Object.keys(validate(formValue)).length > 0) {
      console.log(validate(formValue));
      setLoading(false);
      return;
    } else {
      const newProduct = {
        id: formValue.ItemName.toLowerCase().replace(/\s+/g, "-"), // Generate an ID
        ItemName: formValue.ItemName,
        ItemImg: "/static/media/coca-cola-classic.41f2c27bcd45d38609e7.jpeg",
        ItemPrice: parseFloat(formValue.ItemPrice).toFixed(2),
        Category: formValue.Category,
        ItemIngredients: formValue.ItemIngredients.split(",").map(
          (ingredient) => ingredient.trim()
        ),
        attributes: [], // Split attributes by commas
      };

      // Call APi here
      handleAddNewProduct(newProduct);

      setLoading(false);
      setSubmit(true);
      hideAddNewProductModal();
      setFormValue({
        id: "",
        ItemImg: "",
        ItemName: "",
        ItemIngredients: "",
        ItemPrice: "",
        Category: "",
      });
    }
  };
  return (
    <article
      className={`modal-add-product ${
        addNewProductModalWindow ? "active-add-product-modal" : null
      }`}
    >
      <section className="modal__add_product__inner">
        <button
          className="modal__add__product__inner__close"
          type="button"
          onClick={() => {
            hideAddNewProductModal();
          }}
        >
          X
        </button>
        <section className="modal__add__product__content">
          <h2>Add New Product</h2>
          {loading ? (
            <div role="status" className="loader">
              <p>Almost there...</p>

              <img
                alt="Processing request"
                src="https://media0.giphy.com/media/L05HgB2h6qICDs5Sms/giphy.gif?cid=ecf05e472hf2wk1f2jou3s5fcnx1vek6ggnfcvhsjbeh7v5u&ep=v1_stickers_search&rid=giphy.gif&ct=s"
              />
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                onChange={handleValidation}
                value={formValue.ItemName}
                name="ItemName"
                type="text"
                placeholder="Item Name"
              />

              <input
                onChange={handleValidation}
                value={formValue.ItemIngredients}
                name="ItemIngredients"
                type="text"
                placeholder="Ingredients"
              />

              <input
                onChange={handleValidation}
                value={formValue.ItemPrice}
                name="ItemPrice"
                type="text"
                placeholder="Price"
              />

              <select
                onChange={handleValidation}
                value={formValue.Category}
                name="Category"
                placeholder="Category"
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="Sushi">Sushi</option>
                <option value="Drinks">Drink</option>
              </select>

              <input
                onChange={handleValidation}
                value={formValue.ItemImg}
                name="ItemImg"
                type="text"
                placeholder="Image URL"
              />
              <section className="modal__buttons">
                <button
                  onClick={() => {
                    hideAddNewProductModal();
                  }}
                >
                  Cancel
                </button>
                <button type="submit">Save</button>
              </section>
            </form>
          )}
        </section>
      </section>
    </article>
  );
};

export default AddNewProductModal;
