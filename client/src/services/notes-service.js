import $api from "../http";

export default class NotesService {
  static fetchAllNotes = () => {
    return $api.get(`/api/data/notes`)
  }
  static fetchCount() {
    return $api.get(`/api/data/count`)
  }
  static nextPagination(currentpage, prioritynext, searchvaluenext) {
    return $api.get(`/api/data/nextpageandpagination/?currentpage=${currentpage}&prioritynext=${prioritynext}&searchvaluenext=${searchvaluenext}`)
  }
  static prevPagination(currentpage, priorityprev, searchvalueprevious) {
    return $api.get(`/api/data/previouspageandpagination/?currentpage=${currentpage}&priorityprev=${priorityprev}&searchvalueprevious=${searchvalueprevious}`)
  }
  static searchNotesByTitle(search) {
    return $api.get(`/api/data/searchnotesbytitle/?search=${search}`)
  }
  static fetchByAuthorAndPriorityNotes(author, priority) {
    return $api.get(`/api/data/notesbyauthorandpriority/?priority=${priority}&author=${author}`)
  }
  static fetchByPriorityOrAllNotes(priority) {
    return $api.get(`/api/data/notesbypriority/?priority=${priority}`)
  }
  static fetchByAuthor(author) {
    return $api.get(`/api/data/notesbyauthor/?author=${author}`)
  }
  static fetchAllAuthor() {
    return $api.get(`/api/data/author`)
  }
  static fetchAllPriority() {
    return $api.get(`/api/data/priority`)
  }
  static updateNotePriority(priority, priorityid) {
    return $api.get(`/api/data/updatenotepriority/?priority=${priority}&priorityid=${priorityid}`)
  }
}
