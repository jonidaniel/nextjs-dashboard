"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// useSearchParams allows you to access the parameters of the current URL
// usePathname lets you read the current URL's pathname
// useRouter enables navigation between routes within client components programmatically
import { useSearchParams, usePathname, useRouter } from "next/navigation";
// Debouncing is a programming practice that limits the rate at which a function can fire
// In this case, you only want to query the database when the user has stopped typing
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // This function will wrap the contents of handleSearch,
  // and only run the code after a specific time once the user has stopped typing (300ms)
  const handleSearch = useDebouncedCallback((term) => {
    // URLSearchParams is a Web API
    // that provides utility methods for manipulating the URL query parameters
    // Instead of creating a complex string literal,
    // you can use it to get the params string like ?page=1&query=a
    const params = new URLSearchParams(searchParams);
    // When the user types a new search query,
    // reset the page number to 1
    params.set("page", "1");

    // Set the params string based on the user’s input or,
    // if the input is empty, you want to delete it
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    // ${pathname} is the current path, in this case, '/dashboard/invoices'
    // As the user types into the search bar, params.toString() translates this input into a URL-friendly format
    // replace(${pathname}?${params.toString()}) updates the URL with the user's search data
    // For example, /dashboard/invoices?query=lee if the user searches for 'Lee'
    // The URL is updated without reloading the page, thanks to Next.js's client-side navigation
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        // To ensure the input field is in sync with the URL and will be populated when sharing,
        // you can pass a defaultValue to input by reading from searchParams
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
