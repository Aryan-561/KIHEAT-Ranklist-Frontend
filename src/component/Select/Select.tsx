"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"
import { useNavigate, useParams } from "react-router-dom"



interface Option {
  value: string;
  label: string;
}

// Define props interface
interface SelectBatchProps {
  options: Option[];
}

export const SelectBatch:React.FC<SelectBatchProps> = ({options}) => {
  const [open, setOpen] = React.useState<boolean>(false)
  const [value, setValue] = React.useState<string>("")
  const {course, batch} = useParams()
  const navigate = useNavigate()

  React.useEffect(()=>{
    setValue(batch || "")
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[140px] sm:w-[180px] justify-between bg-green-200 text-black border border-black hover:bg-green-300 cursor-pointer font-roboto-flex "
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : batch || "Select batch..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button> 
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-green-200 font-roboto-flex">
        <Command className="bg-green-200 border border-black">
          <CommandInput className="placeholder:text-gray-500" placeholder="Search batch..." />
          <CommandList className="border-gray-500  border-t-2" >
            <CommandEmpty>No batch found.</CommandEmpty>
            <CommandGroup className="">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue)
                    setOpen(false)
                    navigate(`/${course}/${currentValue}`)
                  }}
                  className={`cursor-pointer data-[selected=true]:bg-green-200 sm:data-[selected=true]:bg-green-300 `}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}