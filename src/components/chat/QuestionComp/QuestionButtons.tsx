import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const QuestionButtons = ({
  editing,
  handleEdit,
  handleDelete,
}: {
  editing: boolean;
  handleEdit: () => Promise<void>;
  handleDelete: () => Promise<void>;
}) => {
  return (
    <div className="mt-1 flex gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={handleEdit}
              className="w-7.5 h-7.5 rounded-lg flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
            >
              <FontAwesomeIcon
                icon={editing ? faCheck : faPenToSquare}
                className="brightness-95 text-sm"
              />
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-foreground text-background">
            <p>{editing ? "Done" : "Edit"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <AlertDialog>
            <TooltipTrigger asChild>
              <AlertDialogTrigger asChild>
                <button
                  type="button"
                  className="w-7.5 h-7.5 rounded-lg flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="brightness-95 text-sm"
                  />
                </button>
              </AlertDialogTrigger>
            </TooltipTrigger>

            <TooltipContent className="bg-foreground text-background">
              <p>Delete</p>
            </TooltipContent>

            <AlertDialogContent className="rounded-2xl">
              <AlertDialogHeader className="select-none">
                <AlertDialogTitle>
                  Are you sure you want to delete this question?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this question and all of its responses.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer select-none rounded-lg">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white cursor-pointer select-none rounded-lg"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default QuestionButtons;
