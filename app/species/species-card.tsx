"use client";

// import type { Database } from "@/lib/schema";
import Image from "next/image";

import DetailedSpecies from "./species-detailed";

// type Species = Database["public"]["Tables"]["species"]["Row"];
interface Species {author: string;
  common_name: string | null;
  description: string | null;
  id: number;
  image: string | null;
  kingdom: "Animalia" | "Plantae" | "Fungi" | "Protista" | "Archaea" | "Bacteria";
  scientific_name: string;
  total_population: number | null;
  profiles: {
    display_name: string;
  } | null;
}

// To pass in more than one prop to this functional component
interface CustomInputProps {
  userId: string;
  species: Species;
}

export default function SpeciesCard(props: CustomInputProps) {
  const species = props.species;
  const userId = props.userId;

  return (
    <div className="min-w-72 m-4 w-72 flex-none rounded border-2 p-3 shadow">
      {species.image && (
        <div className="relative h-40 w-full">
          <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "cover" }} />
        </div>
      )}
      <h3 className="mt-3 text-2xl font-semibold">{species.common_name}</h3>
      <h4 className="text-lg font-light italic">{species.scientific_name}</h4>
      <p>{species.description ? species.description.slice(0, 150).trim() + "..." : ""}</p>
      {/* Replace with detailed view */}
      {/* Bug with closing the modal - happens after row with blobfish, screen flickers */}
      <DetailedSpecies userId={userId} species={species}></DetailedSpecies>
    </div>
  );
}
