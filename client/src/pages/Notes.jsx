import { useContext, useState } from 'react'
import { useQuery } from 'react-query'
import NotesService from '../services/notes-service'
import {observer} from 'mobx-react';
import { Context } from '../App';
import SelectComponent from '../components/SelectComponent';
import {noDataSearch, noDataSearchAll, noDataSearchAuthorPriority} from '../components/no-data-info';
import {spinner} from '../components/spinner';
import SearchForm from '../components/SearchForm';
import Paginationone from '../components/Paginationone';

const Notes = observer(() => {
  const [selectedOption, setSelectedOption] = useState('low');
  const [dataSet, setDataSet] = useState(null);
  const [buttonTarget, setButtonTarget] = useState(null);
  const {store} = useContext(Context);
  
  const {data: data} = useQuery(
    ['notes'],
    () => notesAll(), 
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  )

  const notesAll = async() => {
    try {
      store.setSearchLoading(true)
      store.setLoading(true)
      setTimeout(async() => {
        const res = await NotesService.fetchAllNotes()
        store.settertNotes(res.data.data)
        console.log('%cdata from query =>', 'color: #52eec29a', res.data)
        store.setLoading(false)
        store.setTotalPage(res.data.pages)
        store.setAllDocs(res.data.count)
        return res.data.data
      }, store.loadingtime)
    } catch (e) {
      console.log(e)
    } finally {
      store.setSearchLoading(false)
    }
  }

  function openModal(event) {
    const t = event.target.dataset.action;
    setButtonTarget(event.currentTarget);
    setDataSet(t);
    const modal3 = document.getElementById("crypto-modal"+t);
    const modalme = modal3.querySelector(".modal-me");
    document.addEventListener('click', function(e) {
      e.stopPropagation();
      if (event.target == modal3 || event.target == modalme) {
        modal3.style = "visibility: hidden; opacity: 0; transition: opacity 200ms; scale(.9);";
        document.body.classList.remove('modal-open');
      }
    })
    modal3.style = "visibility: visible; opacity: 1; scale(1);";
    document.body.classList.add('modal-open');
  }

  function closeModal(event) {
    const t2 = event.currentTarget.dataset.action;
    const modal4 = document.getElementById("crypto-modal"+t2);
    modal4.style = "visibility: hidden; opacity: 0; transition: opacity 200ms; scale(.9);";
    document.body.classList.remove('modal-open');
  }

  const handleSub = async(event) => {
    event.preventDefault();
    try {
      await NotesService.updateNotePriority(selectedOption, dataSet);
      const modal3 = document.getElementById("crypto-modal"+dataSet);
      modal3.style = "visibility: hidden; opacity: 0; transition: opacity 200ms; scale(.9);";
      document.body.classList.remove('modal-open');
      buttonTarget.innerHTML = `${selectedOption} priority`;
      setButtonTarget(buttonTarget.innerHTML)
      const btnNewPriority = buttonTarget
      if (btnNewPriority.innerHTML === 'middle priority') {
        if (btnNewPriority.parentElement.classList.contains('bg-indigo-300')) {
          btnNewPriority.parentElement.classList.replace('bg-indigo-300', 'bg-orange-300')
          btnNewPriority.parentElement.classList.replace('text-indigo-600', 'text-orange-600')
        }
        if (btnNewPriority.parentElement.classList.contains('bg-emerald-300')) {
          btnNewPriority.parentElement.classList.replace('bg-emerald-300', 'bg-orange-300')
          btnNewPriority.parentElement.classList.replace('text-emerald-600', 'text-orange-600')
        }
      }
      else if (btnNewPriority.innerHTML === 'high priority') {
        if (btnNewPriority.parentElement.classList.contains('bg-orange-300')) {
          btnNewPriority.parentElement.classList.replace('bg-orange-300', 'bg-indigo-300')
          btnNewPriority.parentElement.classList.replace('text-orange-600', 'text-indigo-600')
        }
        if (btnNewPriority.parentElement.classList.contains('bg-emerald-300')) {
          btnNewPriority.parentElement.classList.replace('bg-emerald-300', 'bg-indigo-300')
          btnNewPriority.parentElement.classList.replace('text-emerald-600', 'text-indigo-600')
        }
      }
      else if (btnNewPriority.innerHTML === 'low priority') {
        if (btnNewPriority.parentElement.classList.contains('bg-orange-300')) {
          btnNewPriority.parentElement.classList.replace('bg-orange-300', 'bg-emerald-300')
          btnNewPriority.parentElement.classList.replace('text-orange-600', 'text-emerald-600')
        }
        if (btnNewPriority.parentElement.classList.contains('bg-indigo-300')) {
          btnNewPriority.parentElement.classList.replace('bg-indigo-300', 'bg-emerald-300')
          btnNewPriority.parentElement.classList.replace('text-indigo-600', 'text-emerald-600')
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onValueChange = (event) => {
    setSelectedOption(event.target.value);
  }

  return (
    <div className='notes-main-container'>
      <h1 id="titlenotes" className="font-bold text-primary text-lg">Notes</h1>
      <div className='container-notes px-4'>
        {/* CURRENT PAGE INFO START */}
        <div className="pageinfo">
          {store.notes.length > 0 ? 
          <>
          <p id="currentpageinfo">Текущая страница: {Number(store.currentPage + 1)}</p>
          </>
          : <p id="currentpageinfo">Текущая страница: {Number(store.currentPage + 1)}</p>
          }
          {store.totalPage > 0 ? 
          <>
          <p id="allpagesinfo">из {store.totalPage}</p>
          </>
          : <p id="allpagesinfo">из {store.totalPageDefault}</p>
          }
        </div>
        {/* CURRENT PAGE INFO END */}
        {/* SELECT START */}
        <SelectComponent />
        {/* SELECT END */}
        <div className="search-and-pagination-wrapper flex items-center justify-between">
        {/* SEARCH START */}
        <SearchForm />
        {/* SEARCH END */}
        {/* PAGINATION START */}
        <Paginationone />
        {/* PAGINATION END */}
        </div>
        <div id="alldata">
          <p id="pagecount" data-action={store.currentPage}></p>
          <p id="allpages" data-action={store.allDocs}></p>

          {store.notes.length > 0 ?
          store.notes.map((note) => (
            <div id={note.id} key={note.id} className="card bg-white shadow-sm rounded-md py-3 px-4 my-4 relative overflow-hidden" >
            <h3 id="information" className="font-bold text-gray-700 text-sm mb-0">{note.title}</h3>
            <p className="my-4 text-sm leading-6" style={{overflowWrap: "anywhere"}}>
              <a href={note.body}>
                {note.body}
              </a>
            </p>
            
            {/* priority === 'low' */}
            {note.priority === 'low' && <div className='pill absolute bottom-0 right-0 rounded-tl-md bg-emerald-300 text-emerald-600 py-1 px-2 mt-3 inline-block text-xs font-semibold'>
              <button onClick={openModal} className="button" type="button" data-action={note.id} data-modal-target={`crypto-modal${note.id}`} data-modal-toggle="crypto-modal">{note.priority} priority
              </button>
            </div>}
            {/* priority === 'middle' */}
            {note.priority === 'middle' && <div className='pill absolute bottom-0 right-0 rounded-tl-md bg-orange-300 text-orange-600 py-1 px-2 mt-3 inline-block text-xs font-semibold'>
              <button onClick={openModal} className="button" type="button" data-action={note.id} data-modal-target={`crypto-modal${note.id}`} data-modal-toggle="crypto-modal">{note.priority} priority
              </button>
            </div>}
            {/* priority === 'high' */}
            {note.priority === 'high' && <div className='pill absolute bottom-0 right-0 rounded-tl-md bg-indigo-300 text-indigo-600 py-1 px-2 mt-3 inline-block text-xs font-semibold'>
              <button onClick={openModal} className="button" type="button" data-action={note.id} data-modal-target={`crypto-modal${note.id}`} data-modal-toggle="crypto-modal">{note.priority} priority
              </button>
            </div>}
            <p className="text-sm text-gray-700">{note.author}</p>
  
            {/* Main modal  */}
            <div id={`crypto-modal${note.id}`} tabIndex="-1" inlist="true" className="crypto-modal overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="modal-me absolute p-4 w-full max-w-md max-h-full m-auto right-0 left-0">
                {/* Modal content */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Change note priority #id {note.id}
                </h3>
                <button onClick={closeModal} data-action={note.id} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crypto-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
                </button>
                </div>
                  {/* Modal body */}
                  <div className="p-4 md:p-5">
                  <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Select new priority
                  </p>
                    <div className="form-container">
                      <form id="input-form" onSubmit={(e) => handleSub(e)}>
                        <label className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-indigo-300">
                          <input
                          type="radio"
                          name="priority"
                          id="high"
                          value="high"
                          checked={selectedOption === "high"}
                          onChange={onValueChange}
                          />
                          <span className="pl-2">High</span>
                        </label>
                        <label className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-indigo-300">
                          <input
                          type="radio"
                          name="priority"
                          id="middle"
                          value="middle"
                          checked={selectedOption === "middle"}
                          onChange={onValueChange}
                          />
                          <span className="pl-2">Middle</span>
                        </label>
                        <label className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-indigo-300">
                          <input
                          type="radio"
                          name="priority"
                          id="low"
                          value="low"
                          checked={selectedOption === "low"}
                          onChange={onValueChange}
                          />
                          <span className="pl-2">Low</span>
                        </label>
                        <button
                        value="submit"
                        id="sub"
                        type="submit"
                        data-action={note.id}
                        className="btn bg-primary font-bold py-2 px-4 rounded mt-2 text-white hover:bg-primaryhover">
                          Post
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Modal */}
          </div>
          ))
          : null}
          {store.nodatafour ? noDataSearchAll() : null}
          {store.nodata ? noDataSearch() : null}
          {store.nodatatwo ? noDataSearchAuthorPriority() : null}
          {store.loading ? spinner() : null}
        </div>
      </div>
    </div>
  )
})

export default Notes
