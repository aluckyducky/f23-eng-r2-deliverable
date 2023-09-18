"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
// import type { Database } from "@/lib/schema";

import { X } from "lucide-react";

import { useState } from "react";

import EditSpeciesDialog from "./edit-species-dialog";

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

export default function DetailedSpecies(props: CustomInputProps) {
  const [open, setOpen] = useState<boolean>(false);
  const species = props.species;
  const userId = props.userId;

  return ( 
      <Dialog open={open} onOpenChange={setOpen}  >
        {/* Bug with closing the modal - happens after row with blobfish, screen flickers */}
        <DialogTrigger asChild>
          <Button className="mt-3 w-full" onClick={() => setOpen(true)}>
            Learn More
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
          <div className="-my-2 flex justify-end">
            {/* <Button className="mr-2" variant="secondary"> <Pen className="mr-2" size={18}/> Edit Entry</Button> */}
            {/* Makes sure that the edit species button only shows up for the user that created it */}
            {species.author === userId ? <EditSpeciesDialog species={species}></EditSpeciesDialog> : null}
            <DialogClose asChild>
              <Button aria-label="Close" onClick={() => setOpen(false)}>
                <X />
              </Button>
            </DialogClose>
          </div>
          {/* Stretch goal - turn into two columns, with most info on left and description on right */}
          <h3 className="mt-2 text-2xl font-semibold">{species.common_name}</h3>
          <h4 className="text-lg font-light italic">{species.scientific_name}</h4>
          <p className="-my-1 text-sm">Kingdom: {species.kingdom}</p>
          <p className="-my-1 text-sm">
            Total Population: {species.total_population ? species.total_population : "N/A"}
          </p>
          <p>{species.description}</p>
          <p className="text-xs italic">Author: {species.profiles ? species.profiles.display_name : ""}</p>
        </DialogContent>
      </Dialog>
  );
}
