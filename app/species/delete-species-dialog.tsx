"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { type Database } from "@/lib/schema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState, type BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";

type Species = Database["public"]["Tables"]["species"]["Row"];

// To pass in more than one prop to this functional component
interface CustomInputProps {
  species: Species;
}

export default function DeleteSpeciesDialog(props: CustomInputProps) {
  const species = props.species;

  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  // Initialize form with the current values of the various variables
  const form = useForm();

  const onSubmit = async () => {
    // The `input` prop contains data that has already been processed by zod. We can now use it in a supabase query
    const supabase = createClientComponentClient<Database>();
    const { error } = await supabase.from("species").delete().eq("id", species.id);

    if (error) {
      return toast({
        title: "Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    }

    setOpen(false);

    // Refresh all server components in the current route. This helps display the newly created species because species are fetched in a server component, species/page.tsx.
    // Refreshing that server component will display the new species from Supabase
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" className="mr-2" variant="destructive"  onClick={() => setOpen(true)}>
          Delete Species
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Delete Species Confirmation</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this species? This will remove all information about this species from the database. This action CANNOT be undone.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e: BaseSyntheticEvent) => void form.handleSubmit(onSubmit)(e)}>

        <div className="flex">
                <Button type="submit" variant="destructive" className="ml-1 mr-1 flex-auto" >
                  Delete Species
                </Button>
                <Button
                  type="button"
                  className="ml-1 mr-1 flex-auto"
                  variant="secondary"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </div>
              </form>
      </DialogContent>
    </Dialog>
  );
}
