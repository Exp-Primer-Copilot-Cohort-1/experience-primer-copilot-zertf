function skillsMember() {
    var member = {
        name: 'John Doe',
        age: 30,
        address: '123 Main St'
    };
    var skills = {
        languages: ['JavaScript', 'Python', 'C++'],
        isDesigner: false,
        isDeveloper: true,
        isArtist: false
    };
    return Object.assign(member, skills);
}
