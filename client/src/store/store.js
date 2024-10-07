import { runInAction, makeAutoObservable } from "mobx";
import axios from 'axios';
import { API_URL } from "../http";

export default class Store {
  constructor() {
    makeAutoObservable(this);
  }
  isAuth = false;
  authorsarray = [];
  statusloading = 'uninitialized';
  locationthis = false;
  tokentrigger = false;
  tokentriggertwo = false;
  tokenTriggerDefault = false;
  googleusererror = null;
  googleuser = null;
  googleUserDefault = null;
  googleUserErrorDefault = null;
  notes = [];
  authors = [];
  priorities = [];
  user = {};
  errors = {};
  query = '';
  isAuth = false;
  searchLoading = false;
  loading = false;
  nodata = false;
  nodatatwo = false;
  nodatathree = false;
  nodatafour = false;
  totalPageDefault = Number(0);
  currentPageDefault = 0;
  currentPage = 0;
  pageQty = 4;
  isCount = 0;
  allDocs = 0;
  loadingtime = 250;
  loadingtimepagination = 150;
  totalPage = Number(0);
  search = ''
  selectedAuthor = {value: 'Выбор автора', label: 'Выбор автора'}
  selectedPriority = {value: 'Выбор приоритета', label: 'Выбор приоритета'}
  fetchtrigger = false;
  navbartrigger = false;
  uploaddata = [];
  uploadmesage = '';
  uploadfilename = '';
  authmessage = '';
  uri = '';
  onceloadtrigger = false;
  errorloginmessage = '';
  errorloginmessageDefault = '';
  setIsAuth(a) {
    this.isAuth = a;
  }
  setTokenTriggerDefault() {
    this.tokentrigger = this.tokenTriggerDefault;
  }
  setTokenTrigger(t) {
    this.tokentrigger = t;
  }
  setErrorLoginMessageDefault() {
    this.errorloginmessage = this.errorloginmessageDefault;
  }
  setErrorLoginMessage(u) {
    this.errorloginmessage = u;
  }
  setOnceLoadTrigger(u) {
    this.onceloadtrigger = u;
  }
  setUri(u) {
    this.uri = u;
  }
  setAuthorsArray(a) {
    this.authorsarray = a;
  }
  setNavbarTrigger(am) {
    this.navbartrigger = am;
  }
  setAuthMessage(am) {
    this.authmessage = am;
  }
  setUploadData(ud) {
    this.uploaddata = ud;
  }
  setUploadFileName(m) {
    this.uploadfilename = m;
  }
  setUploadMessage(m) {
    this.uploadmesage = m;
  }
  setLocationThis(u) {
    this.locationthis = u;
  }
  setGoogleUser(u) {
    this.googleuser = u;
  }
  setGoogleUserInfoError(u) {
    this.googleusererror = u;
  }
  setGoogleUserInfoErrorDefault() {
    this.googleusererror = this.googleUserErrorDefault;
  }
  settertNotes(data) {
    this.notes = data;
  }
  setGoogleUserDefault() {
    this.googleuser = this.googleUserDefault;
  }
  setFetchTrigger(b) {
    this.fetchtrigger = b;
  }
  setSearch(data) {
    // runInAction(() => {
      this.search = data
    // })
  }
  setSelectedAuthor(dataA) {
    // runInAction(() => {
      this.selectedAuthor = dataA
    // })
  }
  setSelectedPriority(dataA) {
    // runInAction(() => {
      this.selectedPriority = dataA
    // })
  }
  settertAuthors(dataA) {
    this.authors = dataA;
  }
  settertPriorities(dataP) {
    this.priorities = dataP;
  }
  setAllDocs(alld) {
    this.allDocs = alld;
  }
  setTotalPage(tp) {
    this.totalPage = tp;
  }
  setCurrentPage(cp) {
    this.currentPage = cp;
  }
  setCurrentPageDefault() {
    this.currentPage = this.currentPageDefault;
  }
  setTotalPageDefault() {
    this.totalPage = this.totalPageDefault;
  }
  setSearchLoading(bool) {
    this.searchLoading = bool;
  }
  setLoading(bool) {
    this.loading = bool;
  }
  setNoData(bool) {
    this.nodata = bool;
  }
  setNoDataTwo(bool) {
    this.nodatatwo = bool;
  }
  setNoDataThree(bool) {
    this.nodatathree = bool;
  }
  setNoDataFour(bool) {
    this.nodatafour = bool;
  }
  setCount(c) {
    this.isCount = c;
  }
  setAuth(bool) {
    this.isAuth = bool;
  }
  setUser(user) {
    this.user = user;
  }

  async getInfoAndRefresTokensNew() {
    this.isAuth = false;

    const instance = axios.create({
      baseURL: 'https://example.com/api/',
      withCredentials: true,
      headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` || null }
    });

    try {
      const res = await instance.post(`${import.meta.env.VITE_API_URL}/authtwo/googlerefreshandinfo`
      )
      runInAction(() => {
        if (res.data?.message === 'ok') {
          this.setTokenTriggerDefault()
          localStorage.setItem('success', 'true')
          console.log('get user info func message ok => ', res.data.userdata.username)
          localStorage.setItem('access_token', res.data.accessToken)
          this.googleuser = res.data.userdata.username
          this.googleusererror = 'Authenticated ok!'
          this.isAuth = true;
        } else {
          console.log('get user info func message not ok => ', res)
          localStorage.removeItem('success')
          this.setGoogleUserDefault();
          this.googleusererror = 'Not authenticated!'
          this.setTokenTriggerDefault()
          localStorage.removeItem('access_token')
          this.setIsAuth(false)
        }
      })
    } catch (err) {
      if (err.response?.data !== undefined) {
        console.log('get user info func error message => ', err.response.data)
        localStorage.removeItem('success')
        this.setGoogleUserInfoError('Not authenticated!')
        this.setTokenTriggerDefault()
        this.setIsAuth(false)
      } else {
        console.log('get user info func error => ', err)
        localStorage.removeItem('success')
        this.setGoogleUserInfoError('Not authenticated!')
        this.setTokenTriggerDefault()
        this.setIsAuth(false)
      }
    }
  }

  async getNotesCount() {
    try {
      const responseCount = await axios.get(`${API_URL}/data/notes`, {withCredentials: true})
      console.log(responseCount.data.count)
      this.setCount(responseCount.data.count)
      console.log('get count ok')
    } catch (e) {
      console.log((e).responseCount?.data?.message);
    } 
  }

  getAuthorSelected() {
    if (this.selectedAuthor.value !== 'Выбор автора') {
      return this.selectedAuthor.value
    }
  }
  getPrioritySelected() {
    if (this.selectedPriority.value !== 'Выбор приоритета') {
      return this.selectedPriority.value
    }
  }
  getOnceLoadTrigger() {
    return this.onceloadtrigger
  }
  getFetchTrigger() {
    return this.fetchtrigger
  }
  getGoogleUser() {
    return this.googleuser
  }

}
