export default function Navbar() {
    return (    
        <nav class="bg-white border-b-2 border-gray-100 px-2 sm:px-4 py-3.5">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
            <a href="#" class="flex items-center">
                <span class="self-center text-xl font-semibold whitespace-nowrap">lip<span class="text-sky-600">forum</span></span>
            </a>
            <button id="toogle-menu" data-collapse-toggle="mobile-menu" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2" aria-controls="mobile-menu" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-6 h-6" aria-hidden="true" viewBox="0 0 20 20" xmlns=""><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                <svg class="hidden w-6 h-6" aria-hidden="true" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
            <div class="hidden w-full md:block md:w-auto" id="mobile-menu">
            <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                <li>
                <a href="#" class="block py-2 pr-4 pl-3 text-white bg-sky-600 rounded md:bg-transparent md:text-sky-600 md:p-0 dark:text-white" aria-current="page">Posts</a>
                </li>
                <li>
                <a href="/create" class="block py-2 pr-4 pl-3 text-black border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-sky-600 md:p-0 md:dark:hover:text-sky-600 dark:hover:text-indigo-600 md:dark:hover:bg-transparent">Create</a>
                </li>
                <li>
                <a href="/api/logout" class="block py-2 pr-4 pl-3 text-black border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-sky-600 md:p-0 md:dark:hover:text-sky-600 dark:hover:text-indigo-600 md:dark:hover:bg-transparent">Log Out</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    )
}