# Local storage schema

Typing coauthored by Liam and Aaron

## Architecture and Hooks

Hooks can be found in `src/hooks/`.

Localstorage is always read from a single source of truth, the context provided datastore, to correctly propagate
renders on mutations

```
                                                             (Keeps a mirror of localstorage data.
 context: [datastore, refreshData(key)]                       All reads of localstorage must read this mirror.
   |                                                          All writes are responsible for calling refreshData)
   |                                                  
   |---- useStore('applications'): [applications,            (Extracts the applications localstorage from the localstorage
   |            |            putApplication(application)]     mirror. It also provides a method to modify/add a record.
   |            |                                             The data is stringified and written, and then a call to
   |            |                                             the context is made to update the mirror.)
   |            |                   
   |    useApplication(id): [application,                    (Extracts application with the id from useApplications.
   |                         updateApplication(updates)]      It also provides a method to merge the existing record
   |                                                          with an object passed in the updates paramater.
   |                                                          This uses the applications and putApplication from 
   |                                                          useApplications respectively - keeping all data to a single
   |                                                          source of truth! React stays in sync)
   |                                             
   |---------------------------------------------------------------------|
   |                                                                     |
   |---- useStore('tutorAccounts'): [tutors, putTutor(updates)]          |
   |         |                                                           |            
   |         |                useStore('lecturerAcccounts'): [lecturers, putLecturer(updates)]
   |         |                                 |
   |         |              |------------------|
   |         |              |
   |------useUser(type, id): [user, updateUser(updates)]      (All other hooks follow the same pattern.
   |                                                           The useUser hook is the most complicated as it
   |                                                           sources the authenticatedUser from localstorage
   |                                                           and then resolves the record with useTutors or useLecturers
   |                                                           based on the type paramater.
   |                                                           Although this may be complicated all of the paramaters
   |                                                           and data remain statically typed.)
   |                                                            
   |---- useStore('courses'): [courses, setCourse]
   |            |                                              
                |                                              
                |                                              
                |                                             
        useCourse(id): [course, updateCourse]                    
```

## Types

Please see `LocalstorageSchema` in `./types.ts`

### Accounts

| key                 | type                |
|---------------------|---------------------|
| `tutorAccounts`     | `TutorAccount[]`    |
| `lecturerAccounts`  | `LecturerAccount[]` |
| `authenticatedUser` | `AuthenticatedUser` |

### Applicants

| key            | type            |
|----------------|-----------------|
| `applications` | `Application[]` |

### Applications

| key       | type       |
|-----------|------------|
| `courses` | `Course[]` |
