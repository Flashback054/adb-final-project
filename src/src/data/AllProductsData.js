import CocaCola from "../assets/images/drinks-images/coca-cola-classic.jpeg";
import MountainDew from "../assets/images/drinks-images/Mountain Dew Citrus.webp";
import PepsiCola from "../assets/images/drinks-images/Pepsi Cola.jpeg";
import Milo from "../assets/images/drinks-images/milos.jpeg";
import DrPepper from "../assets/images/drinks-images/Diet Dr Pepper Soda.jpg";
import SpriteCaffeine from "../assets/images/drinks-images/Sprite Caffeine-Free Lemon Lime Soda Pop.jpeg";
import GreatValueSweet from "../assets/images/drinks-images/Great Value.jpeg";
import SToK from "../assets/images/drinks-images/SToK.webp";
import Lipton from "../assets/images/drinks-images/Lipton Green Tea.jpeg";
import CanadaDry from "../assets/images/drinks-images/Canada Dry Ginger.jpg";
import DrPepperZero from "../assets/images/drinks-images/Dr Pepper Zero Sugar.jpeg";
//Sushi
import SalmonPoke from "../assets/images/sushi-images/sushi-19.jpeg";
import VeggiePoke from "../assets/images/sushi-images/sushi-26.jpeg";
import MiniSalmon from "../assets/images/sushi-images/sushi-12.jpeg";
import OmbosSeth from "../assets/images/sushi-images/sushi-23.jpeg";
import VeggieSet from "../assets/images/sushi-images/sushi-27.jpeg";
import FriendlySet from "../assets/images/sushi-images/sushi-8.jpeg";
import SunnyPhiladelphia from "../assets/images/sushi-images/sushi-22.jpeg";
import HiddenDragon from "../assets/images/sushi-images/sushi-9.jpeg";
import HottestTaisho from "../assets/images/sushi-images/sushi-24.jpeg";
import BurningTaisho from "../assets/images/sushi-images/sushi-3.jpeg";
import BlissfulEel from "../assets/images/sushi-images/sushi-2.jpeg";
import Sebastian from "../assets/images/sushi-images/sushi-20.jpeg";
import DoubleSalmon from "../assets/images/sushi-images/sushi-6.jpeg";
import ClockworkOrange from "../assets/images/sushi-images/sushi-4.jpeg";
import KiwiRoll from "../assets/images/sushi-images/sushi-11.jpeg";
import Siamese from "../assets/images/sushi-images/sushi-25.jpeg";
import SalmonMaki from "../assets/images/sushi-images/sushi-18.jpeg";
import NigiriWithRoasted from "../assets/images/sushi-images/sushi-15.jpeg";
import NigiriWithSalmon from "../assets/images/sushi-images/sushi-16.jpeg";
import NigiriWithEel from "../assets/images/sushi-images/sushi-14.jpeg";
import VulcanTobiko from "../assets/images/sushi-images/sushi-29.jpeg";
import SalmonGunkan from "../assets/images/sushi-images/sushi-17.jpeg";
import VeryVegetarian from "../assets/images/sushi-images/sushi-28.jpeg";
import SushiOne from "../assets/images/sushi-images/sushi-1.jpeg";
import CucumberMaki from "../assets/images/sushi-images/sushi-5.jpeg";
import HungrySet from "../assets/images/sushi-images/sushi-10.jpeg";
import NigiriOcean from "../assets/images/sushi-images/sushi-13.jpeg";
import FoggyAlbion from "../assets/images/sushi-images/sushi-7.jpeg";
import StanleyKubrick from "../assets/images/sushi-images/sushi-21.jpeg";

export const allProductsData = [
  {
    id: "coca-cola-original-soda-pop",
    ItemImg: CocaCola,
    ItemName: "Coca-Cola Original Soda Pop",
    ItemPrice: (1).toFixed(2),
    Category: "Drinks",
    attributes: [],
  },

  {
    id: "mountain-dew-citrus-soda-pop",
    ItemImg: MountainDew,
    ItemName: "Mountain Dew Citrus Soda Pop",
    ItemPrice: (2).toFixed(2),
    Category: "Drinks",
    attributes: [],
  },
  {
    id: "pepsi-cola-soda-pop",
    ItemImg: PepsiCola,
    ItemName: "Pepsi Cola Soda Pop",
    ItemPrice: (1).toFixed(2),
    Category: "Drinks",
    attributes: [],
  },
  {
    id: "milos-famous-sweet-tea",
    ItemImg: Milo,
    ItemName: "Milo’s Famous Sweet Tea",
    ItemPrice: (1).toFixed(2),
    Category: "Drinks",
    attributes: [],
  },
  {
    id: "dr-pepper-soda",
    ItemImg: DrPepper,
    ItemName: "Dr Pepper Soda",
    ItemPrice: (1).toFixed(2),
    Category: "Drinks",
    attributes: [],
  },
  {
    id: "sprite-caffeine-free-lemon-lime-soda-pop",
    ItemImg: SpriteCaffeine,
    ItemName: "Sprite Caffeine-Free Lemon Lime Soda Pop",
    ItemPrice: (2).toFixed(2),
    Category: "Drinks",
    attributes: [],
  },
  {
    id: "great-value-sweet-brewed-iced-tea",
    ItemImg: GreatValueSweet,
    ItemName: "Great Value Sweet Brewed Iced Tea",
    ItemPrice: (2).toFixed(2),
    Category: "Drinks",
    attributes: [],
  },
  {
    id: "stok-cold-brew-coffee-black-iunsweetened",
    ItemImg: SToK,
    ItemName: "SToK Cold Brew Coffee, Black Unsweetened",
    ItemPrice: (3).toFixed(2),
    Category: "Drinks",
    attributes: [],
  },
  {
    id: "lipton-green-tea-citrus-iced-tea",
    ItemImg: Lipton,
    ItemName: "Lipton Green Tea Citrus Iced Tea",
    ItemPrice: (2).toFixed(2),
    Category: "Drinks",
    attributes: [],
  },
  {
    id: "canada-dry-ginger-ale-soda",
    ItemImg: CanadaDry,
    ItemName: "Canada Dry Ginger Ale Soda",
    ItemPrice: (2).toFixed(2),
    Category: "Drinks",
    attributes: [],
  },
  {
    id: "dr-pepper-zero-sugar-soda",
    ItemImg: DrPepperZero,
    ItemName: "Dr Pepper Zero Sugar Soda",
    ItemPrice: (2).toFixed(2),
    Category: "Drinks",
    attributes: [],
  },
  {
    id: "salmon-poke",
    ItemImg: SalmonPoke,
    ItemName: "Salmon Poke",
    ItemIngredients:
      "Salmon, Avocado, Rice, Cabbage, Carrots, Creen onions, Sesame.",
    ItemPrice: (10).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },

  {
    id: "veggie-poke",
    ItemImg: VeggiePoke,
    ItemName: "Veggie Poke",
    ItemIngredients:
      "Rice, Avocado, Cabage, Carrot, Ginger, Green Onion, Sesam.",
    ItemPrice: (8).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "mini-salmon-set-22-pcs",
    ItemImg: MiniSalmon,
    ItemName: "Mini Salmon Set - 22Pcs",
    ItemIngredients:
      "Double Salmon Roll,Californication, Salmon Nigiri - 2Pcs, Eel Nigiri - 2Pcs,Vulcan Gunkan - 2Pcs",
    ItemPrice: (35).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "the-bull-of-ombos-set-32-pcs",
    ItemImg: OmbosSeth,
    ItemName: "The Bull of Ombos Set - 32 Pcs",
    ItemIngredients:
      "Double Salmon Roll, Sunny Philadelphia, Salmon Maki Raki, Cucumber Maki Raki.",
    ItemPrice: (30).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "veggie-set-32-pcs",
    ItemImg: VeggieSet,
    ItemName: "Veggie Set 32Pcs",
    ItemIngredients:
      "Very Veggie Roll, Very Veggie Maki, Cucumber Maki Raki, Avocado Maki Raki.",
    ItemPrice: (16).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "friendly-set-40-pcs",
    ItemImg: FriendlySet,
    ItemName: "Friendly Set 40Pcs",
    ItemIngredients:
      "Californication, Spicy Salmon Roll, Blissful Eel Roll, Sebastian the Crab Roll, Cucumber Maki Raki.",
    ItemPrice: (30).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "sunny-philadelphia-roll-8-pcs",
    ItemImg: SunnyPhiladelphia,
    ItemName: "Sunny Philadelphia Roll 8Pcs",
    ItemIngredients: "Salmon, cream cheese, avocado, rice, sesame, nori.",
    ItemPrice: (12).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "hidden-dragon-roll-8-pcs",
    ItemImg: HiddenDragon,
    ItemName: "Hidden Dragon Roll 8Pcs",
    ItemIngredients:
      "Salmon, cream cheese, avocado, tobiko, rice, sesame, cucumber, nori.",
    ItemPrice: (13).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "double-salmon-roll-8-pcs",
    ItemImg: DoubleSalmon,
    ItemName: "Double Salmon Roll 8Pcs",
    ItemIngredients:
      "Salmon, Cream Cheese, Avocado, Sesame, Extra Salmon Slice, Cucumber, Rice, nori.",
    ItemPrice: (14).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "the-hottest-taisho",
    ItemImg: HottestTaisho,
    ItemName: "The Hottest Taisho",
    ItemIngredients:
      "Salmon, Cream Cheese, Avocado, Cucumber, Rice - all comes with your chosen sauce.",
    ItemPrice: (12).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "burning-taisho",
    ItemImg: BurningTaisho,
    ItemName: "Burning Taisho",
    ItemIngredients: "Salmon, Avocado, Rice, Cucumber, Cream Cheese.",
    ItemPrice: (10).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "blissful-eel-roll-8-pcs",
    ItemImg: BlissfulEel,
    ItemName: "Blissful Eel Roll 8Pcs",
    ItemIngredients:
      "Eel kinda blissful, Cream Cheese, Avocado, Tobico, Sesame, Rice, Nori.",
    ItemPrice: (14).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "sebastian-the-crab-roll-8-pcs",
    ItemImg: Sebastian,
    ItemName: "Sebastian the Crab Roll 8Pcs",
    ItemIngredients:
      "Crab with Unique Sauce, Cream Cheese, Avocado, Dried Tuna Flakes, Sesame, Cucumber Rice, Nori.",
    ItemPrice: (13).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "double-salmon-roll-8-pcs-3",
    ItemImg: DoubleSalmon,
    ItemName: "Double Salmon Roll 8Pcs",
    ItemIngredients:
      "Salmon, Cream Cheese, Avocado, Sesame, Extra Salmon Slice, Cucumber, Rice, Nori.",
    ItemPrice: (10).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "clockwork-orange-roll-8-pcs",
    ItemImg: ClockworkOrange,
    ItemName: "Clockwork Orange Roll 8Pcs",
    ItemIngredients: "Salmon, orange, cream cheese, salmon extra slice, nori.",
    ItemPrice: (11).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "kiwi-roll-8-pcs",
    ItemImg: KiwiRoll,
    ItemName: "Kiwi Roll 8Pcs",
    ItemIngredients:
      "Salmon, Kiwi, Carrot, Cream Cheese, Tobico, Cucumber, Rice, Nori.",
    ItemPrice: (13).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "the-roll-of-siamese",
    ItemImg: Siamese,
    ItemName: "The Roll of Siamese",
    ItemIngredients: "Salmon, Cucumber, Carrot, Caviar, Rice.",
    ItemPrice: (15).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "salmon-maki-raki-8-pcs",
    ItemImg: SalmonMaki,
    ItemName: "Salmon Maki Raki 8Pcs",
    ItemIngredients: "Salmon, Cream Cheese, Rice, Nori.",
    ItemPrice: (9).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "nigiri-with-roasted-salmon-1-pc",
    ItemImg: NigiriWithRoasted,
    ItemName: "Nigiri with Roasted Salmon 1Pc",
    ItemIngredients: "Roasted Salmon, Rice.",
    ItemPrice: (5).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "nigiri-with-salmon-and-orange-1-pc",
    ItemImg: NigiriWithSalmon,
    ItemName: "Nigiri with Salmon and Orange 1Pc",
    ItemIngredients: "Salmon, Orange, Rice.",
    ItemPrice: (4).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "nigiri-with-eel-1-pc",
    ItemImg: NigiriWithEel,
    ItemName: "Nigiri with Eel 1Pc",
    ItemIngredients: "Eel, rice.",
    ItemPrice: (6).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "vulcan-tobiko",
    ItemImg: VulcanTobiko,
    ItemName: "Vulcan Tobiko",
    ItemIngredients: "Delicious Gunkan with Tobiko and Rice.",
    ItemPrice: (4).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "salmon-gunkan-with-cream-cheese",
    ItemImg: SalmonGunkan,
    ItemName: "Salmon Gunkan with Cream Cheese",
    ItemIngredients: "Perfect sushi rice, Nigiri prawns, Cream cheese, Wasabi.",
    ItemPrice: (11).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "very-vegetarian-maki-8-pcs",
    ItemImg: VeryVegetarian,
    ItemName: "Very Vegetarian Maki 8Pcs",
    ItemIngredients: "Avocado, Cream Cheese, Cucumber, Rice, Nori.",
    ItemPrice: (5).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "avocado-maki-raki-8-pcs",
    ItemImg: SushiOne,
    ItemName: "Avocado Maki Raki 8Pcs",
    ItemIngredients: "Avocado, Cream Cheese, Rice, Nori.",
    ItemPrice: (5).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "cucumber-maki-raki-8-pcs",
    ItemImg: CucumberMaki,
    ItemName: "Cucumber Maki Raki 8Pcs",
    ItemIngredients: "Cucumber, Sesame, Rice, Nori.",
    ItemPrice: (4).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "hungry-set-64-pcs",
    ItemImg: HungrySet,
    ItemName: "Hungry Set 64Pcs",
    ItemIngredients:
      "Californication,  Sunny Philadelphia Roll, Spicy Salmon Roll, Blissful Eel Roll, Sebastian the Crab Roll, Very Vegetarian Maki Raki, Cucumber Maki Raki,  Avocado Maki Raki.",
    ItemPrice: (50).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "nigiri-ocean-14-pcs",
    ItemImg: NigiriOcean,
    ItemName: "Nigiri Ocean - 14 Pcs",
    ItemIngredients:
      "14 Different Nigiris: Salmon Nigiri - 2Pcs, Salmon Nigiri with Orange - 2Pcs, Eel Nigiri - 2Pcs, Tuna Nigiri - 2Pcs, Fried Tuna Nigiri - 2Pcs, Fried Salmon Nigiri - 2Pcs, Kiwi Nigiri - 2Pcs",
    ItemPrice: (40).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "foggy-albion-26-pcs",
    ItemImg: FoggyAlbion,
    ItemName: "Foggy Albion - 26Pcs",
    ItemIngredients:
      "Sunny Philadelphia, Sebastian the Crab, Cucumber Maki Raki, Salmon Gunkan with Cream Cheese - 2Pcs",
    ItemPrice: (30).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "stanley-kubrick-24-pcs",
    ItemImg: StanleyKubrick,
    ItemName: "Stanley Kubrick - 24 Pcs",
    ItemIngredients:
      "Clockwork Orange Roll, Spicy Salmon Roll, Very Vegetarian Maki",
    ItemPrice: (11).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "salmon-poke-second",
    ItemImg: SalmonPoke,
    ItemName: "Salmon Poke",
    ItemIngredients:
      "Salmon, Avocado, Rice, Cabbage, Carrots, Creen onions, Sesame.",
    ItemPrice: (10).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },

  {
    id: "veggie-poke-second",
    ItemImg: VeggiePoke,
    ItemName: "Veggie Poke",
    ItemIngredients:
      "Rice, Avocado, Cabage, Carrot, Ginger, Green Onion, Sesam.",
    ItemPrice: (8).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "mini-salmon-set-22-pcs-second",
    ItemImg: MiniSalmon,
    ItemName: "Mini Salmon Set - 22Pcs",
    ItemIngredients:
      "Double Salmon Roll,Californication, Salmon Nigiri - 2Pcs, Eel Nigiri - 2Pcs,Vulcan Gunkan - 2Pcs",
    ItemPrice: (35).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "the-bull-of-ombos-set-32-pcs-second",
    ItemImg: OmbosSeth,
    ItemName: "The Bull of Ombos Set - 32 Pcs",
    ItemIngredients:
      "Double Salmon Roll, Sunny Philadelphia, Salmon Maki Raki, Cucumber Maki Raki.",
    ItemPrice: (30).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "veggie-set-32-pcs-second",
    ItemImg: VeggieSet,
    ItemName: "Veggie Set 32Pcs",
    ItemIngredients:
      "Very Veggie Roll, Very Veggie Maki, Cucumber Maki Raki, Avocado Maki Raki.",
    ItemPrice: (16).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "friendly-set-40-pcs-second",
    ItemImg: FriendlySet,
    ItemName: "Friendly Set 40Pcs",
    ItemIngredients:
      "Californication, Spicy Salmon Roll, Blissful Eel Roll, Sebastian the Crab Roll, Cucumber Maki Raki.",
    ItemPrice: (30).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "sunny-philadelphia-roll-8-pcs-second",
    ItemImg: SunnyPhiladelphia,
    ItemName: "Sunny Philadelphia Roll 8Pcs",
    ItemIngredients: "Salmon, cream cheese, avocado, rice, sesame, nori.",
    ItemPrice: (12).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "hidden-dragon-roll-8-pcs-second",
    ItemImg: HiddenDragon,
    ItemName: "Hidden Dragon Roll 8Pcs",
    ItemIngredients:
      "Salmon, cream cheese, avocado, tobiko, rice, sesame, cucumber, nori.",
    ItemPrice: (13).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "double-salmon-roll-8-pcs-second",
    ItemImg: DoubleSalmon,
    ItemName: "Double Salmon Roll 8Pcs",
    ItemIngredients:
      "Salmon, Cream Cheese, Avocado, Sesame, Extra Salmon Slice, Cucumber, Rice, nori.",
    ItemPrice: (14).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "the-hottest-taisho-second",
    ItemImg: HottestTaisho,
    ItemName: "The Hottest Taisho",
    ItemIngredients:
      "Salmon, Cream Cheese, Avocado, Cucumber, Rice - all comes with your chosen sauce.",
    ItemPrice: (12).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "burning-taisho-second",
    ItemImg: BurningTaisho,
    ItemName: "Burning Taisho",
    ItemIngredients: "Salmon, Avocado, Rice, Cucumber, Cream Cheese.",
    ItemPrice: (10).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "blissful-eel-roll-8-pcs-second",
    ItemImg: BlissfulEel,
    ItemName: "Blissful Eel Roll 8Pcs",
    ItemIngredients:
      "Eel kinda blissful, Cream Cheese, Avocado, Tobico, Sesame, Rice, Nori.",
    ItemPrice: (14).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "sebastian-the-crab-roll-8-pcs-second",
    ItemImg: Sebastian,
    ItemName: "Sebastian the Crab Roll 8Pcs",
    ItemIngredients:
      "Crab with Unique Sauce, Cream Cheese, Avocado, Dried Tuna Flakes, Sesame, Cucumber Rice, Nori.",
    ItemPrice: (13).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "double-salmon-roll-8-pcs-sec",
    ItemImg: DoubleSalmon,
    ItemName: "Double Salmon Roll 8Pcs",
    ItemIngredients:
      "Salmon, Cream Cheese, Avocado, Sesame, Extra Salmon Slice, Cucumber, Rice, Nori.",
    ItemPrice: (10).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "clockwork-orange-roll-8-pcs-second",
    ItemImg: ClockworkOrange,
    ItemName: "Clockwork Orange Roll 8Pcs",
    ItemIngredients: "Salmon, orange, cream cheese, salmon extra slice, nori.",
    ItemPrice: (11).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "kiwi-roll-8-pcs-second",
    ItemImg: KiwiRoll,
    ItemName: "Kiwi Roll 8Pcs",
    ItemIngredients:
      "Salmon, Kiwi, Carrot, Cream Cheese, Tobico, Cucumber, Rice, Nori.",
    ItemPrice: (13).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "the-roll-of-siamese-second",
    ItemImg: Siamese,
    ItemName: "The Roll of Siamese",
    ItemIngredients: "Salmon, Cucumber, Carrot, Caviar, Rice.",
    ItemPrice: (15).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "salmon-maki-raki-8-pcs-second",
    ItemImg: SalmonMaki,
    ItemName: "Salmon Maki Raki 8Pcs",
    ItemIngredients: "Salmon, Cream Cheese, Rice, Nori.",
    ItemPrice: (9).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "nigiri-with-roasted-salmon-1-pc-second",
    ItemImg: NigiriWithRoasted,
    ItemName: "Nigiri with Roasted Salmon 1Pc",
    ItemIngredients: "Roasted Salmon, Rice.",
    ItemPrice: (5).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "nigiri-with-salmon-and-orange-1-pc-second",
    ItemImg: NigiriWithSalmon,
    ItemName: "Nigiri with Salmon and Orange 1Pc",
    ItemIngredients: "Salmon, Orange, Rice.",
    ItemPrice: (4).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "nigiri-with-eel-1-pc-second",
    ItemImg: NigiriWithEel,
    ItemName: "Nigiri with Eel 1Pc",
    ItemIngredients: "Eel, rice.",
    ItemPrice: (6).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "vulcan-tobiko-second",
    ItemImg: VulcanTobiko,
    ItemName: "Vulcan Tobiko",
    ItemIngredients: "Delicious Gunkan with Tobiko and Rice.",
    ItemPrice: (4).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "salmon-gunkan-with-cream-cheese-second",
    ItemImg: SalmonGunkan,
    ItemName: "Salmon Gunkan with Cream Cheese",
    ItemIngredients: "Perfect sushi rice, Nigiri prawns, Cream cheese, Wasabi.",
    ItemPrice: (11).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "very-vegetarian-maki-8-pcs-second",
    ItemImg: VeryVegetarian,
    ItemName: "Very Vegetarian Maki 8Pcs",
    ItemIngredients: "Avocado, Cream Cheese, Cucumber, Rice, Nori.",
    ItemPrice: (5).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "avocado-maki-raki-8-pcs-second",
    ItemImg: SushiOne,
    ItemName: "Avocado Maki Raki 8Pcs",
    ItemIngredients: "Avocado, Cream Cheese, Rice, Nori.",
    ItemPrice: (5).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "cucumber-maki-raki-8-pcs-second",
    ItemImg: CucumberMaki,
    ItemName: "Cucumber Maki Raki 8Pcs",
    ItemIngredients: "Cucumber, Sesame, Rice, Nori.",
    ItemPrice: (4).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "hungry-set-64-pcs-second",
    ItemImg: HungrySet,
    ItemName: "Hungry Set 64Pcs",
    ItemIngredients:
      "Californication,  Sunny Philadelphia Roll, Spicy Salmon Roll, Blissful Eel Roll, Sebastian the Crab Roll, Very Vegetarian Maki Raki, Cucumber Maki Raki,  Avocado Maki Raki.",
    ItemPrice: (50).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "nigiri-ocean-14-pcs-second",
    ItemImg: NigiriOcean,
    ItemName: "Nigiri Ocean - 14 Pcs",
    ItemIngredients:
      "14 Different Nigiris: Salmon Nigiri - 2Pcs, Salmon Nigiri with Orange - 2Pcs, Eel Nigiri - 2Pcs, Tuna Nigiri - 2Pcs, Fried Tuna Nigiri - 2Pcs, Fried Salmon Nigiri - 2Pcs, Kiwi Nigiri - 2Pcs",
    ItemPrice: (40).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "foggy-albion-26-pcs-second",
    ItemImg: FoggyAlbion,
    ItemName: "Foggy Albion - 26Pcs",
    ItemIngredients:
      "Sunny Philadelphia, Sebastian the Crab, Cucumber Maki Raki, Salmon Gunkan with Cream Cheese - 2Pcs",
    ItemPrice: (30).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
  {
    id: "stanley-kubrick-24-pcs-second",
    ItemImg: StanleyKubrick,
    ItemName: "Stanley Kubrick - 24 Pcs",
    ItemIngredients:
      "Clockwork Orange Roll, Spicy Salmon Roll, Very Vegetarian Maki",
    ItemPrice: (11).toFixed(2),
    Category: "Sushi",
    attributes: [],
  },
];
