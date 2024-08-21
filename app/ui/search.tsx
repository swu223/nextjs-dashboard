'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { 
  useSearchParams,
  usePathname,
  useRouter
 } from 'next/navigation';
 import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  // Step 2a searchParams lets you read the searchParams of the search. this is written second
  const searchParams = useSearchParams();
  // step 3 add the pathname to capture the base pathname. add replace to navigate to the new page
  const pathname = usePathname();
  const { replace } = useRouter();
  
  // Step 1 onClick and handlesearch written is first to test that the search is working. 
  // Step 4 rewrite handleSearch to a DebounchedCallback
  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`)
    // Step 2b add the searchParams to capture the params
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      // if the search bar has a term, then we set the search params to the term
      params.set('query', term);
    } else {
      params.delete('query');
    }
    // Step 3b add the replace function to navigate
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
        onChange={(e)=>{
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
