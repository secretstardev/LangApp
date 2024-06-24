export class StatsCalendarMock {
  private days = 112;

  get statsCalendarDays(): string[] {
    return Array.from({ length: this.days }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (this.days - index - 1));

      return this.formatDate(date);
    });
  }

  formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };
}
