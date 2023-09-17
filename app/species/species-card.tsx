"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  // DialogDescription,
  // DialogHeader,
  // DialogTitle,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Database } from "@/lib/schema";
import Image from "next/image";

import { X } from "lucide-react";

import { useState } from "react";

import EditSpeciesDialog from "./edit-species-dialog";

type Species = Database["public"]["Tables"]["species"]["Row"];

// To pass in more than one prop to this functional component
interface CustomInputProps {
  userId: string;
  species: Species;
}

export default function SpeciesCard(props: CustomInputProps) {
  const [open, setOpen] = useState<boolean>(false);
  const species = props.species;
  const userId = props.userId;

  // const detailed_info = ({

  // })

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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mt-3 w-full" onClick={() => setOpen(true)}>
            Learn More
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
          <div className="-my-2 flex justify-end">
            {/* <Button className="mr-2" variant="secondary"> <Pen className="mr-2" size={18}/> Edit Entry</Button> */}
            <EditSpeciesDialog userId={userId} species={species}></EditSpeciesDialog>
            <DialogClose>
              <button className="" aria-label="Close">
                <X />
              </button>
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
