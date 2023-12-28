# frozen_string_literal: true

require "jekyll-watch"

module Jekyll
  module Watcher

    def to_exclude_regexps(options)
      [
        "^\\.jekyll\\-metadata",
        options.fetch("watch_exclude", nil),
      ].flatten.compact.map(&Regexp.method(:new))
    end

    # Paths to ignore for the watch option
    #
    # options - A Hash of options passed to the command
    #
    # Returns a list of relative paths from source that should be ignored
    def listen_ignore_paths_regexp(options)
      #puts "Ignoring with regexp, #{options.fetch("watch_exclude", nil)}"
      source = Pathname.new(options["source"]).expand_path
      paths  = to_exclude(options)
      #puts "To exclude: #{paths}"

      paths.map do |p|
        absolute_path = Pathname.new(normalize_encoding(p, options["source"].encoding)).expand_path
        next unless absolute_path.exist?

        begin
          relative_path = absolute_path.relative_path_from(source).to_s
          relative_path = File.join(relative_path, "") if absolute_path.directory?
          unless relative_path.start_with?("../")
            path_to_ignore = %r!^#{Regexp.escape(relative_path)}!
            Jekyll.logger.debug "Watcher:", "Ignoring #{path_to_ignore}"
            path_to_ignore
          end
        rescue ArgumentError
          # Could not find a relative path
        end
      end.compact + to_exclude_regexps(options)
    end

    alias :old_listen_ignore_paths :listen_ignore_paths
    alias :listen_ignore_paths :listen_ignore_paths_regexp
  end
end