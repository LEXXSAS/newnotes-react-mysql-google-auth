import { useContext, useEffect, useState } from 'react'
import Select from 'react-select';
import {observer} from 'mobx-react';
import { Context } from '../App';
import NotesService from '../services/notes-service';

const SelectComponent = observer(() => {
  const {store} = useContext(Context);

  const [isSearchable, setIsSearchable] = useState(true);

  const countAll = async() => {
    try {
      store.setSearchLoading(true)
      const res = await NotesService.fetchCount();
      store.setTotalPage(res.data.pages)
      store.setAllDocs(res.data.count)
      return res.data.data
    } catch (e) {
      console.log(e)
    } finally {
      store.setSearchLoading(false)
    }
  }
  const priorityAll = async() => {
    try {
      store.setSearch('')
      localStorage.removeItem('searchvalue');
      store.setSearchLoading(true)
      store.setLoading(true)
      store.setNoData(false)
      store.setNoDataTwo(false)
      store.setNoDataFour(false)
      if (store.selectedPriority.value !== 'Выбор приоритета' && store.selectedPriority.value !== 'all' && store.selectedAuthor.value === 'Выбор автора') {
        store.settertNotes([])
        setTimeout(async() => {
          const res = await NotesService.fetchByPriorityOrAllNotes(store.selectedPriority.value);
          if (res.data.data.length <= 0) {
            store.setLoading(false)
            store.setCurrentPageDefault()
            store.setTotalPageDefault()
          } else {
            store.setNoData(false)
            store.setNoDataTwo(false)
            store.setNoDataFour(false)
            if (store.nodata === false && store.nodatatwo === false && store.nodatafour === false) {
              store.settertNotes(res.data.data)
              store.setTotalPage(res.data.pages)
              store.setAllDocs(res.data.count)
              store.setCurrentPageDefault()
              store.setLoading(false)
              return res.data.data
            }
          }
        }, store.loadingtime)
      } else if
      (store.selectedAuthor.value === 'Выбор автора' && store.selectedPriority.value === 'all') {
        store.settertNotes([])
        store.setCurrentPageDefault()
        setTimeout(async() => {
          const res = await NotesService.fetchByPriorityOrAllNotes('all');
          store.setNoData(false)
          store.setNoDataTwo(false)
          store.setNoDataFour(false)
          if (store.nodata === false && store.nodatatwo === false && store.nodatafour === false) {
            store.settertNotes(res.data.data)
            store.setTotalPage(res.data.pages)
            store.setAllDocs(res.data.count)
            store.setLoading(false)
            return res.data.data
          }
        }, store.loadingtime)}
        else {
          store.setSelectedPriority({label: 'all', value: 'all'})
          store.setCurrentPageDefault()
          store.setFetchTrigger(false)
          if (store.selectedPriority.value !== 'Выбор приоритета') {
          store.settertNotes([])
          store.setNoData(false)
          store.setNoDataFour(false)
          setTimeout(async() => {
            const res = await NotesService.fetchByAuthorAndPriorityNotes(store.selectedAuthor.value, store.selectedPriority.value);
            if (res.data.data.length <= 0) {
              store.setNoData(false)
              store.setNoDataTwo(false)
              store.setNoDataFour(false)
              store.setCurrentPageDefault()
              if (store.nodata === false && store.nodatatwo === false && store.nodatafour === false) {
                store.setTotalPageDefault()
                store.setLoading(false)
                store.setNoData(true)
              }
            } else {
              store.setNoData(false)
              store.setNoDataTwo(false)
              store.setNoDataFour(false)
              if (store.nodata === false && store.nodatatwo === false && store.nodatafour === false) {
                store.settertNotes(res.data.data)
                store.setTotalPage(res.data.pages)
                store.setAllDocs(res.data.count)
                store.setLoading(false)
                return res.data.data
              }
            }
          }, store.loadingtime)
        }
      }
    } catch (e) {
      console.log(e)
    } finally {
      store.setSearchLoading(false)
    }
  }
  const priorityOnly = async() => {
    try {
      const restwo = await NotesService.fetchAllPriority();
      store.settertPriorities(restwo.data.data)
      return restwo.data.data
    } catch (e) {
      console.log(e)
    }
  }

  const authorOnly = async() => {
    try {
      const restwo = await NotesService.fetchAllAuthor();
      store.settertAuthors(restwo.data.data)
      return restwo.data.data
    } catch (e) {
      console.log(e)
    } finally {
      store.setSearchLoading(false)
    }
  }

  const authorAndPriority = async() => {
    try {
      store.setSearch('')
      localStorage.removeItem('searchvalue');
      store.setSearchLoading(true)
      store.setLoading(true)
      store.setNoData(false)
      store.setNoDataTwo(false)
      store.setNoDataFour(false)
      store.settertNotes([])
      if (store.getPrioritySelected() !== 'all') {
        store.setFetchTrigger(true)
        setTimeout(async() => {
          const res = await NotesService.fetchByAuthorAndPriorityNotes(store.selectedAuthor.value, store.selectedPriority.value);
          if (res.data.data.length <= 0) {
            store.setNoData(false)
            store.setNoDataTwo(false)
            store.setNoDataFour(false)
            if (store.nodata === false && store.nodatatwo === false && store.nodatafour === false) {
              store.setLoading(false)
              store.setTotalPageDefault()
              store.setNoDataTwo(true)
            }
          } else {
            store.setNoData(false)
            store.setNoDataTwo(false)
            store.setNoDataFour(false)
            if (store.nodata === false && store.nodatatwo === false && store.nodatafour === false) {
              store.settertNotes(res.data.data)
              store.setLoading(false)
              store.setTotalPage(res.data.pages)
              return res.data.data
            }
          }
        }, store.loadingtime)
      }
      else if (store.getPrioritySelected() === 'all' && store.getAuthorSelected() !== undefined) {
        if (store.getFetchTrigger() === true) {
          store.settertNotes([])
          store.setNoData(false)
          store.setNoDataFour(false)
          setTimeout(async() => {
            const res = await NotesService.fetchByAuthorAndPriorityNotes(store.selectedAuthor.value, 'all');
            if (res.data.data.length <= 0) {
              store.setNoData(false)
              store.setNoDataTwo(false)
              store.setNoDataFour(false)
              store.setCurrentPageDefault()
              if (store.nodata === false && store.nodatatwo === false && store.nodatafour === false) {
                store.setLoading(false)
                store.setNoData(true)
                store.setTotalPageDefault()
              }
            } else {
              store.setNoData(false)
              store.setNoDataTwo(false)
              store.setNoDataFour(false)
              if (store.nodata === false && store.nodatatwo === false && store.nodatafour === false) {
                store.settertNotes(res.data.data)
                store.setTotalPage(res.data.pages)
                store.setLoading(false)
                return res.data.data
              }
            }
          }, store.loadingtime)
        }
      }
    } catch (e) {
      console.log(e)
    } finally {
      store.setSearchLoading(false)
    }
  }

  useEffect(() => {
    priorityOnly()
    authorOnly()
  }, [])

  useEffect(() => {
    if (store.getAuthorSelected() !== undefined || store.getPrioritySelected() === 'all') {
      priorityAll()
    }
  }, [store.selectedAuthor])
  
  useEffect(() => {
    if (store.getPrioritySelected() !== undefined)
    {
      authorAndPriority()
    }
    else {
      if (store.selectedPriority.value === 'Выбор приоритета' && store.selectedAuthor.value !== 'Выбор автора') {
        store.setFetchTrigger(true)
      }
    }
  }, [store.selectedPriority])

  useEffect(() => {
    if (store.selectedPriority.value === 'all' && store.selectedAuthor.value === 'Выбор автора') {
      priorityAll()
    }
  }, [store.selectedPriority])
  
  useEffect(() => {
    if (store.selectedPriority.value === 'Выбор приоритета' && store.selectedAuthor.value === 'Выбор автора' && store.getFetchTrigger() === true) {
      store.settertNotes([])
      store.setCurrentPageDefault()
      store.setLoading(true)
      store.setNoData(false)
      store.setNoDataTwo(false)
      store.setNoDataFour(false)
      setTimeout(async() => {
        if (store.nodata === false && store.nodatatwo === false && store.nodatafour === false && store.search === '') {
          store.setLoading(false)
          store.setNoData(true)
          store.setTotalPageDefault()
        }
      }, store.loadingtime)
    }
    else if (store.selectedPriority.value === 'Выбор приоритета' && store.selectedAuthor.value !== 'Выбор автора' && store.getFetchTrigger() === true) {
      store.settertNotes([])
      store.setLoading(true)
      store.setNoData(false)
      store.setNoDataTwo(false)
      store.setNoDataFour(false)
      setTimeout(async() => {
        if (store.nodata === false && store.nodatatwo === false && store.nodatafour === false) {
          store.setTotalPageDefault()
          store.setLoading(false)
          store.setNoData(true)
        }
      }, store.loadingtime)
    } else if (store.selectedPriority.value !== 'Выбор приоритета' && store.selectedPriority.value !== 'all' && store.selectedAuthor.value === 'Выбор автора' && store.getFetchTrigger() === true) {
      priorityAll()
    }
  }, [store.selectedPriority, store.selectedAuthor])

  useEffect(() => {console.log('nodata action!!!')}, [store.nodata])

  const getAuthorsToArray = () => {
    let authorsArray = [{value: 'Выбор автора', label: 'Выбор автора'}]
    store.authors.map((item) => 
      authorsArray.push({value: `${item.author}`, label: `${item.author}`})
    )
    return authorsArray
  }
  const getPrioritiesToArray = () => {
    let prioritiesArray = [{value: 'Выбор приоритета', label: 'Выбор приоритета'}, {value: 'all', label: 'all'}]
    store.priorities.map((item) => 
    prioritiesArray.push({value: `${item.priority}`, label: `${item.priority}`})
    )
    return prioritiesArray
  }
  
  return (
  <div className="select-container mt-3">
    <div id="selectid" className="select-author form-select px-2 py-1 transition-all  appearance-none invalid:text-black/30 w-64">
    <Select
    theme={(theme) => ({
      ...theme,
      borderRadius: '5px',
      colors: {
        ...theme.colors,
        primary: 'rgb(199 210 254)',
      },
    })}
     options={store.authors.length < 0 ? store.selectedAuthor : getAuthorsToArray()} 
     className='basic-single'
     value={store.selectedAuthor}
     defaultValue={store.selectedAuthor}
     isSearchable={isSearchable}
     name='select'
     placeholder='Выбор автора'
     onChange={(value, actionMeta) => store.setSelectedAuthor(value)}
    />
    </div>
    <div id="selectidtwo" className="form-selectpx-2 py-1 transition-all appearance-none invalid:text-black/30 w-64">
    <Select
    theme={(theme) => ({
      ...theme,
      borderRadius: '5px',
      colors: {
        ...theme.colors,
        primary: 'rgb(199 210 254)',
      },
    })}
     options={store.priorities.length < 0 ? store.selectedPriority : getPrioritiesToArray()} 
     className='basic-single'
     defaultValue={store.selectedPriority}
     value={store.selectedPriority}
     isSearchable={isSearchable}
     name='select'
     placeholder='Выбор приоритета'
     onChange={(value, actionMeta) => store.setSelectedPriority(value)}
    />
    </div>
  </div>
  )
})

export default SelectComponent
