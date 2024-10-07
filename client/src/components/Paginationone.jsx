import { useContext } from "react";
import { Context } from "../App";
import {observer} from 'mobx-react';
import NotesService from "../services/notes-service";
const Paginationone = observer(() => {
  const {store} = useContext(Context);

  const handleNext = () => {
    let lockNext = false;
    if (store.currentPage >= Number(store.totalPage) - 1) {
      lockNext = true;
    }
    if (!lockNext) {
      store.setSearchLoading(true)
      store.setLoading(true)
      store.setNoData(false)
      store.setNoDataTwo(false)
      store.setNoDataFour(false)
      try {
        store.settertNotes([])
        store.setNoDataTwo(false)
        setTimeout(async() => {
          const res = await NotesService.nextPagination(store.currentPage + 1, store.selectedPriority, store.search);
          if (res.data.data.length <= 0) {
            store.settertNotes([])
            store.setNoData(false)
            store.setNoDataTwo(false)
            store.setNoDataFour(false)
            if (store.nodata === false && store.nodatatwo === false && store.nodatafour === false && store.notes.length <= 0) {
              store.setLoading(false)
              store.setNoDataTwo(true)
            }
          } else {
            store.setNoData(false)
            store.setNoDataTwo(false)
            store.setNoDataFour(false)
            if (store.nodata === false && store.nodatatwo === false && store.nodatafour === false) {
              store.setLoading(false)
              store.settertNotes(res.data.data)
              store.setCurrentPage(res.data.currentpage)
              return res.data.data
            }
          }
        }, store.loadingtimepagination)
      } catch (e) {
        console.log(e)
      } finally {
        store.setSearchLoading(false)
      }
    }
  }
  const prevPage = () => {
    let lockNext = false;
    if (store.currentPage <= 0) {
      lockNext = true;
    }
    if (!lockNext && store.currentPage > 0) {
      store.setSearchLoading(true)
      store.setLoading(true)
      store.setNoData(false)
      store.setNoDataTwo(false)
      store.setNoDataFour(false)
      try {
        store.settertNotes([])
        store.setNoDataTwo(false)
        setTimeout(async() => {
          const res = await NotesService.prevPagination(store.currentPage - 1, store.selectedPriority, store.search);
          if (res.data.data.length <= 0) {
            store.settertNotes([])
            store.setNoData(false)
            store.setNoDataTwo(false)
            store.setNoDataFour(false)
            if (store.nodata === false && store.nodatatwo === false && store.nodatafour === false && store.notes.length <= 0) {
              store.setLoading(false)
              store.setNoDataTwo(true)
            }
          } else {
            store.setNoData(false)
            store.setNoDataTwo(false)
            store.setNoDataFour(false)
            if (store.nodata === false && store.nodatatwo === false && store.nodatafour === false) {
              store.setLoading(false)
              store.settertNotes(res.data.data)
              store.setCurrentPage(res.data.currentpage)  
              return res.data.data
            }
          }
        }, store.loadingtimepagination)
      } catch (e) {
        console.log(e)
      } finally {
        store.setSearchLoading(false)
      }
    }
  }

  const handlePrevious = () => {
    prevPage()
  }

  return (
  <div className="nav-wrapper inline-flex">
    <nav className="nav-pagination" aria-label="Page navigation">
      <ul className="ul-pagination inline-flex gap-1">
        <li id="li-previous">
        <button onClick={handlePrevious} id="previous" className="previous rounded-full h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white focus:shadow-outline ">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg>
        </button>
        </li>
        <li id="li-next">
        <button onClick={handleNext} id="next" className="next rounded-full h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white focus:shadow-outline ">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg>
        </button>
        </li>
      </ul>
    </nav>
  </div>
  )
})

export default Paginationone
