//375
import pizzaOne375 from "../assets/images/menu-slider/pizza-one-375.webp";
import pizzaTwo375 from "../assets/images/menu-slider/pizza-two-375.webp";
import pizzaThree375 from "../assets/images/menu-slider/pizza-three-375.webp";
import SalmonPoke375 from "../assets/images/menu-slider/sushi-one-375.webp";
import VeggiePoke375 from "../assets/images/menu-slider/sushi-two-375.webp";
import MiniSalmon375 from "../assets/images/menu-slider/sushi-three-375.webp";
import ChickenAlfredo375 from "../assets/images/menu-slider/pasta-one-375.webp";
import AllaGricia375 from "../assets/images/menu-slider/pasta-two-375.webp";
import SheetPan375 from "../assets/images/menu-slider/pasta-three-375.webp";
//700
import pizzaOne700 from "../assets/images/menu-slider/pizza-one-700.webp";
import pizzaTwo700 from "../assets/images/menu-slider/pizza-two-700.webp";
import pizzaThree700 from "../assets/images/menu-slider/pizza-three-700.webp";
import SalmonPoke700 from "../assets/images/menu-slider/sushi-one-700.webp";
import VeggiePoke700 from "../assets/images/menu-slider/sushi-two-700.webp";
import MiniSalmon700 from "../assets/images/menu-slider/sushi-three-700.webp";
import ChickenAlfredo700 from "../assets/images/menu-slider/pasta-one-700.webp";
import AllaGricia700 from "../assets/images/menu-slider/pasta-two-700.webp";
import SheetPan700 from "../assets/images/menu-slider/pasta-three-700.webp";

const menuSliderCategories = [
  {
    name: "sushi",
    id: "sushi",
  },
];
const menuSliderProducts = [
  {
    id: "salmon-poke",
    img375: SalmonPoke375,
    img700: SalmonPoke700,
    name: "Salmon Poke",
    describtion:
      "Salmon, Avocado, Rice, Cabbage, Carrots, Creen onions, Sesame.",
    price: (10).toFixed(2),
    category: "sushi",
  },

  {
    id: "veggie-poke",
    img375: VeggiePoke375,
    img700: VeggiePoke700,
    name: "Veggie Poke",
    describtion: "Rice, Avocado, Cabage, Carrot, Ginger, Green Onion, Sesam.",
    price: (8).toFixed(2),
    category: "sushi",
  },
  {
    id: "mini-salmon-set-22-pcs",
    img375: MiniSalmon375,
    img700: MiniSalmon700,
    name: "Mini Salmon Set",
    describtion:
      "Double Salmon Roll,Californication, Salmon Nigiri - 2Pcs, Eel Nigiri - 2Pcs,Vulcan Gunkan - 2Pcs",
    price: (35).toFixed(2),
    category: "sushi",
  },
];

export { menuSliderProducts, menuSliderCategories };
