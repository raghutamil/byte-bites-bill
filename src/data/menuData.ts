import idlyImg from "@/assets/idly.jpg";
import puttuImg from "@/assets/puttu.jpg";
import pooriImg from "@/assets/poori.jpg";
import coffeeImg from "@/assets/coffee.jpg";
import dosaImg from "@/assets/dosa.jpg";
import vadaImg from "@/assets/vada.jpg";
import { MenuItem } from "@/types/menu";

export const initialMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Idly",
    price: 30,
    image: idlyImg,
    category: "Breakfast",
  },
  {
    id: "2",
    name: "Puttu",
    price: 40,
    image: puttuImg,
    category: "Breakfast",
  },
  {
    id: "3",
    name: "Poori",
    price: 45,
    image: pooriImg,
    category: "Breakfast",
  },
  {
    id: "4",
    name: "Filter Coffee",
    price: 25,
    image: coffeeImg,
    category: "Beverages",
  },
  {
    id: "5",
    name: "Masala Dosa",
    price: 60,
    image: dosaImg,
    category: "Breakfast",
  },
  {
    id: "6",
    name: "Medu Vada",
    price: 35,
    image: vadaImg,
    category: "Breakfast",
  },
];
