import React from "react";
import DishCard from "./DishCard";

const dishes = [
  {
    title: "Chicken Burger With Cheese",
    price: "Rs. 12.50",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCnkV52vKVDeh1CUtLtyd8G90PqZCmnD1WhROCHSX_q9c1YfZBFjqWYz0t5Y4W5eFBPcb9scX9Gn5gHHYg9gsMDmuSHCjmWk219NTKU8VwZie1PaMvbzhfzB739_s9E9VVyDpRgEeANcRKqxZztrtjySGKGviRfoqWfRYrWoO3tm6pz9xgcPvoA1xymxnWQaMWUJc8z2G4Js4ftBGYaPMgOn1qcqDaGcmHBtGJ_UBhzJQPJKpyKO4Dnz29oLr6vrMqnU0rZmwKFohI",
  },
  {
    title: "Pepperoni Pizza Extra",
    price: "Rs. 15.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDxYe-XJwfNfzdz5CpltS78MgMqta6KTxB5rV5wAtQxAcb8dYu-4HBNq4NNCMY3lI1luwWPu01QAcrcJQsN_CUxfD1HU7royGxug4QcDlLcBhYr-rIKfCOBRBpAdXpMbmthWL6aRbgYhNyTEMDU8Wod8s--Qi4w6aQEsKibOpxvFWOWFLoTjbPG13XP19lSyERbuQ0DvdHWrAs5WvlzW5riVbs-Cowj2m32L7gUji-Ca-p8pHF2sJPAT9FcZjqcWOBwDvYGQ5bFx-8",
  },
  {
    title: "Classic Garden Salad",
    price: "Rs. 8.75",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDk4cQD2PdNP8KYCc8a0RBzsVA0owFZ8lT04c4IvDZkFzSYUfQa_9aoTCnzHoVmT_Lq0s-PXRSGrmUcEfhgkcufWOANo8hpZfqLODSLWqetQvfLOkEXWJRAkyRl6XezN8lJ3xOtNd3z4qeMmRmG6sg7Xf9qkAAd5GRIGYWlsayw-PDozKXF3MWHG7qIWtH1OIz0SMZs41z4rM_zn2uRDipdfJrPMlzATvnESxG_Bcmht3Gl8tVTI7o2s86M8kJgZgvj1V0QwDHLI8o",
  },
  {
    title: "Spicy Tomato Soup",
    price: "Rs. 6.50",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBhX3w0s0C5JgWGbVdu6K70HLD6woKdoeltSgwbLSnG4Y77bTihSJwuTmxGfdqK3tXi7PbZJaeBLd0Ub0lNua7kLhyfP9KXRSdCqrgUJkPpxr_hgCZeL0SneBX5Aby1E1sNPD9v3CVEzE_-vnnFrn99UjhYZYmnK_KkgbilL1Fnhm5GX1FK8QWMLEn17CGOFcZwLE3As6JmiCk1vv2hLUXm3aA42CgyLDsvR4s36lv0jcLQa1FTZBifeRyY_dYN9JcFlB9eG2wQIxc",
  },
  {
    title: "Honey BBQ Spare Ribs",
    price: "Rs. 18.25",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBvwMY_2fF-rzY7Q4ZUPID9JzTT0ObYz2ZEdPv7cpPuwgk-GYHcsO9d2MkhY0aFFi7K4tD5_p2LWK6eqwFLPVCDnlTEraqOV2qzBxl9He9gCtOTS8Tcs54UQmjdsSR4bjvLhXHbgPfjsB6CirFgegTH2j7NqfP-_tPAKiY0ehCDvLsLF9fh0WzuUqeDDiYSTF00_nUYAEYOwlhG6_S1cthind0dWl93INr5M7kw2mY82viYbtoYOe4KMO2jaV-aQUQg6yapuzj4t1k",
  },
  {
    title: "Signature Sushi Platter",
    price: "Rs. 22.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCHvsfyIS7Yem21k66bVwzWwvpgBR4YLBJVFf64PorDLhDN9dfdtKzrYbu8CYt8iNFae5XXK5f2RrHHlqpkMJK6GFF6Daq2J3SVad52yZWLzBNgK5D4MvPlW4yctQHS0xb_Blf9zkCDKGBbBGmxz8HsZpIMtvUFiCzF_aTXzCAV6QIsMQ1QdEb7oA-0Vze19lfdgWNGmxbLnyMgt_b4-gk048HQZIflF-DrRea2iQcDxZ6RTlpxeAvsPSe24nAbVXEBokxnZB6hCjA",
  },
  {
    title: "Grilled Atlantic Salmon",
    price: "Rs. 21.50",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5qBtphSEgKkCOmE58wRrZ-OQLY7ZSKCq0P26KVcFGADbzPvw4JXpMX9_I5kL5xQC2OokzyAA7mqubyV7wEVRjsGPqvz_FXnPvHkkvJPBdcp9CdXFZ2q34vRmr2uEIVk-nYlxOrRGsiiNaYxgeRFF3YaIuXpRU-lKy8wqfZLnIEHLPIcPhiDWAioDU6r2mO-vRxSMqYS-ZdkBTZWWjpoAutUu085qUwhDs5BB2IxMfvOFhkiuvfa1kQquxC5fj_aaQH0ae9pIX5A0",
  },
  {
    title: "Classic Pasta Carbonara",
    price: "Rs. 14.25",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC4kZ--K7WM7gT3CbRZh18Hke33uveXTcIPQccIoUtvx5tvAbMTOJZ1XqwwT95mSnbPcF-ZW0HOfWWqrDwQK1jVFaOR-q4aQfGSlSNN9e3urmqC0ZtmQICCyIOJb6JqLCfH5PxLS_DVa9EatwZ0LXuwSvnWZmc4dOmNqXlEpRk9VH5tmEfcoj_D-1tbXF8NJijWMEHrdI4-WLjQmnK71fkaQZm5qBf4O8ldeA-EbVukzf4xccfMKLdHGAsO4MAfdsJJgCUbYp2zOVw",
  },
  {
    title: "Molten Chocolate Cake",
    price: "Rs. 7.95",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAzVfXkrtec3eZOFRfajcgahDQyq8wnzREcIvc4RsFUUqc2P6mgF9rVXuEECXsQtGNbPBBNFpgh9vlb8_zCos3V7PDqB83AWEZ5MROtY2ArbYCCjpm8reQK9Tbgtkj3q4e7gD5OQDf50RknvwbMr3_NIVg8hWKwFu10EzhrjAxqJAxfOi9PUZ4ADBpbNREKumztc0m_9mKQTn4iraG-D4PqsVqayBdCrspZcRZUDQ0L1SXHQRjosSjadIaX7MnXC-eeysg_3Xvu_j4",
  },
];

export default function DishGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
      {dishes.map((dish, i) => (
        <div
          className="transition-transform duration-300 hover:scale-105"
          key={dish.title}
        >
          <DishCard {...dish} />
        </div>
      ))}
    </div>
  );
}
